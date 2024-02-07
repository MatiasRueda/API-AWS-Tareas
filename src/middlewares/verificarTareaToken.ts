import middy, { MiddlewareObj } from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { respuesta } from '../auxiliar/respuesta';
import { ESTADO, MENSAJE_ERROR, TABLA } from '../auxiliar/definicion';
import jwt from "jsonwebtoken";
import { obtenerItems } from '../database/database';
import { Tarea } from '../auxiliar/types';

const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<APIGatewayProxyResult | void>=> {
  try {
    const id = request.event.pathParameters?.id;
    const decode = jwt.decode(request.event.headers.authorization!) as { nombre: string }; 
    const tareas: Tarea[] = await obtenerItems<Tarea>(TABLA.TAREA, { columna: "id", valor: id? id : JSON.parse(request.event.body!).id });
    
    if (!tareas.length  || tareas.pop()!.usuario !== decode.nombre)
      return respuesta(ESTADO.REQUEST_ERROR, MENSAJE_ERROR.TOKEN_INCORRECTO, false);
  } catch (error) {
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);  
  }
}

export const verificarTareaToken = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  return { before };
}
