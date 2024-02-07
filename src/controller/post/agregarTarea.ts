import { APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { BodyTarea, Tarea } from "../../auxiliar/types";
import { respuesta } from "../../auxiliar/respuesta";
import { ESTADO, MENSAJE_ERROR, MENSAJE_EXITOSO, TABLA } from "../../auxiliar/definicion";
import { agregarItem } from "../../database/database";
import middy from "@middy/core";
import { tipoBodyTarea } from "../../middlewares/tipoBodyTarea";
import jsonBodyParser from "@middy/http-json-body-parser";
import { hayRequestBody } from "../../middlewares/hayRequestBody";
import { verificarToken } from "../../middlewares/verificarToken";
import jwt from "jsonwebtoken";

const agregarTareaBase = async(event: { body: BodyTarea , headers: { authorization: string } }): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body;
    const id: string = v4();
    const decode = jwt.decode(event.headers.authorization) as { nombre: string }; 
    const nuevaTarea: Tarea = {
      id,
      usuario: decode.nombre,
      ...body,
      realizado: false
    };
    await agregarItem<Tarea>(TABLA.TAREA, nuevaTarea);
    return respuesta<Tarea>(ESTADO.CREADO, MENSAJE_EXITOSO.TAREA_AGREGADA, true, nuevaTarea);
  } catch(error) {
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);
  }
}

export const agregarTarea = middy(agregarTareaBase)
.use(hayRequestBody())
.use(tipoBodyTarea())
.use(verificarToken())
.use(jsonBodyParser());