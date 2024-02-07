import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { Condicion, StringKeys, Tarea } from "../auxiliar/types";
import { hash , compare } from "bcryptjs";

export async function obtenerItems<T>(tabla: string, condicion?: Condicion): Promise<T[]>  {
  const dynamodb: DynamoDBDocument = DynamoDBDocument.from(new DynamoDB());
  const params: ScanCommandInput = {
    TableName: tabla,
    FilterExpression: condicion? '#columna = :value' : undefined,
    ExpressionAttributeNames: condicion? {
      '#columna': condicion.columna,
    } : undefined,
    ExpressionAttributeValues: condicion? {
      ":value": condicion.valor
    } : undefined
  };

  const resultado = await dynamodb.scan(params);
  return (resultado.Items as T[]);
}

export async function compararContrasenias(contrasenia: string, contraseniaHash: string): Promise<boolean> {
  return await compare(contrasenia, contraseniaHash);
}

export async function agregarItem<T extends Record<string, any>>(tabla: string, item: T, encryptar?: StringKeys<T>): Promise<void> {
  const dynamodb: DynamoDBDocument = DynamoDBDocument.from(new DynamoDB());
  const saltOrRounds: number = 10;
  let nuevoItem = {};
  if (encryptar)
    nuevoItem[encryptar as string] = await hash(item[encryptar], saltOrRounds);
  await dynamodb.put({
    TableName: tabla,
    Item: {...item, ...nuevoItem}
  });
}

export async function actualizarItemTarea(tabla: string, tarea: Tarea): Promise<Tarea> {
  const dynamodb: DynamoDBDocument = DynamoDBDocument.from(new DynamoDB());
  const respuesta = await dynamodb.update({
    TableName: tabla,
    Key: { id: tarea.id },
    UpdateExpression: "set #titulo = :titulo , #descripcion = :descripcion , #realizado = :realizado",
    ExpressionAttributeNames: {
      '#titulo': 'titulo',
      '#descripcion': 'descripcion',
      '#realizado': 'realizado',
    },
    ExpressionAttributeValues: {
      ":titulo": tarea.titulo,
      ":descripcion": tarea.descripcion,
      ":realizado": tarea.realizado,
    },
    ReturnValues: "ALL_NEW",
  });
  return (respuesta.Attributes! as Tarea);
}

export async function eliminarItem(tabla: string , id: string): Promise<void> {
  const dynamodb: DynamoDBDocument = DynamoDBDocument.from(new DynamoDB());
  await dynamodb.delete({
    TableName: tabla,
    Key: { id }
  })
}