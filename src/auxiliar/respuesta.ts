import { APIGatewayProxyResult } from "aws-lambda";
import { ESTADO } from "./definicion";

export function respuesta<T>(codigo: ESTADO, message: string, success: boolean, data?: T): APIGatewayProxyResult {
  return {
    statusCode: codigo,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify({
      message,
      success,
      data
    })
  }
}