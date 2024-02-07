import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { respuesta } from "../../auxiliar/respuesta";
import middy from "@middy/core";
import { ESTADO, MENSAJE_ERROR, MENSAJE_EXITOSO, TABLA } from "../../auxiliar/definicion";
import { eliminarItem } from "../../database/database";
import { verificarToken } from "../../middlewares/verificarToken";
import { verificarTareaToken } from "../../middlewares/verificarTareaToken";

const eliminarTareaBase = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters!.id;
    await eliminarItem(TABLA.TAREA, id!);
    return respuesta(ESTADO.OK, MENSAJE_EXITOSO.TAREA_ELIMINADA, true);
  } catch(error) {
  return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);
  }
}

export const eliminarTarea = middy(eliminarTareaBase)
.use(verificarToken())
.use(verificarTareaToken());