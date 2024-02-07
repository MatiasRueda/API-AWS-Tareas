import middy, { MiddlewareObj } from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { respuesta } from '../auxiliar/respuesta';
import { ESTADO, MENSAJE_ERROR, TABLA } from '../auxiliar/definicion';
import jwt from "jsonwebtoken";
import { obtenerItems } from '../database/database';
import { Usuario } from '../auxiliar/types';

const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<APIGatewayProxyResult | void>=> {
  try {
    if (!Object.keys(request.event.headers).find(llave => llave === "authorization"))
      return respuesta(ESTADO.REQUEST_ERROR, MENSAJE_ERROR.TOKEN_NO_INGRESADO, false);
    const decode = jwt.decode(request.event.headers.authorization!) as { id: string }; 
    if (!decode || !((await obtenerItems<Usuario>(TABLA.USUARIO, { columna: "id", valor: decode.id })).length) ) 
      return respuesta(ESTADO.REQUEST_ERROR, MENSAJE_ERROR.TOKEN_INCORRECTO, false);
  } catch (error) {
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);  
  }
}

export const verificarToken = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  return { before };
}
