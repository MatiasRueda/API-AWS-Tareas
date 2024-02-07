import middy, { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ESTADO, MENSAJE_ERROR } from "../auxiliar/definicion";
import { respuesta } from "../auxiliar/respuesta";

const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<APIGatewayProxyResult | void>=> {
  if (!request.event.body) 
    return respuesta(ESTADO.REQUEST_ERROR, MENSAJE_ERROR.REQUEST_BODY, false);
}
export const hayRequestBody = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  return { before };
}
      