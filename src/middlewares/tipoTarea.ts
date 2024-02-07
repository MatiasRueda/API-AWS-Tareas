import middy, { MiddlewareObj } from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { respuesta } from '../auxiliar/respuesta';
import { ESTADO, MENSAJE_ERROR } from '../auxiliar/definicion';

const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<APIGatewayProxyResult | void>=> {
  try {
    const body: Record<string, any> = JSON.parse(request.event.body!);
    if (!(Object.keys(body).length === 5 && "id" in body && "titulo" in body && "descripcion" in body && "usuario" in body && "realizado" in body))
      throw new TypeError();
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError) 
      return respuesta(ESTADO.REQUEST_ERROR, MENSAJE_ERROR.REQUEST_BODY_PROPERTIES, false);
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);  
  }
}

export const tipoTarea = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  return { before };
}
