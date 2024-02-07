import { APIGatewayProxyHandler , APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { respuesta } from "./auxiliar/respuesta";
import { ESTADO, MENSAJE_EXITOSO } from "./auxiliar/definicion";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return respuesta(ESTADO.OK, MENSAJE_EXITOSO.INICIO, true);
};
