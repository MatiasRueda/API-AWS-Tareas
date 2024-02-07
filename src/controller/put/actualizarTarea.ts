import { APIGatewayProxyResult } from "aws-lambda";
import { actualizarItemTarea } from "../../database/database";
import { respuesta } from "../../auxiliar/respuesta";
import { ESTADO, MENSAJE_ERROR, MENSAJE_EXITOSO, TABLA } from "../../auxiliar/definicion";
import { Tarea } from "../../auxiliar/types";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { hayRequestBody } from "../../middlewares/hayRequestBody";
import { tipoTarea } from "../../middlewares/tipoTarea";
import { verificarToken } from "../../middlewares/verificarToken";
import { verificarTareaToken } from "../../middlewares/verificarTareaToken";

const actualizarTareaBase = async (event: { body: Tarea }): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body;
    const tareaActualizada = await actualizarItemTarea(TABLA.TAREA, body );
    return respuesta(ESTADO.OK, MENSAJE_EXITOSO.TAREA_ACTUALIZADA, true , tareaActualizada);
  } catch (error) {
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);
  }
}

export const actualizarTarea = middy(actualizarTareaBase)
.use(hayRequestBody())
.use(tipoTarea())
.use(verificarToken())
.use(verificarTareaToken())
.use(jsonBodyParser());