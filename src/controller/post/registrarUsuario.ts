import { APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { BodyUsuario, Condicion, Usuario } from "../../auxiliar/types";
import { respuesta } from "../../auxiliar/respuesta";
import { ESTADO, MENSAJE_ERROR, MENSAJE_EXITOSO, TABLA } from "../../auxiliar/definicion";
import { agregarItem, obtenerItems } from "../../database/database";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { hayRequestBody } from "../../middlewares/hayRequestBody";
import { tipoBodyUsuario } from "../../middlewares/tipoBodyUsuario";

const registrarUsuarioBase = async(event: { body: BodyUsuario }): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body;
    const condicion: Condicion = {
      columna: "nombre",
      valor: body.nombre,
    };
    const usuarios: Usuario[] = await obtenerItems<Usuario>(TABLA.USUARIO, condicion);
    console.log(usuarios);
    if (!!usuarios.length)
      return respuesta(ESTADO.PROHIBIDO, MENSAJE_ERROR.USUARIO_YA_REGISTRADO, false);
    const id: string = v4();
    const nuevousuario: Usuario = {
      id,
      ...body,
    };
    await agregarItem<Usuario>(TABLA.USUARIO, nuevousuario, "contrasenia");
    return respuesta(ESTADO.OK, MENSAJE_EXITOSO.USUARIO_AGREGADO, true);

  } catch(error) {
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);
  }
}

export const registrarUsuario = middy(registrarUsuarioBase)
.use(hayRequestBody())
.use(tipoBodyUsuario())
.use(jsonBodyParser());