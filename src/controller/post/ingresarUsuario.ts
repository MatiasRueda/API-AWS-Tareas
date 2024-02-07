import { APIGatewayProxyResult } from "aws-lambda";
import { BodyUsuario , Condicion, RespuestaUsuario, Tarea, Usuario } from "../../auxiliar/types";
import { respuesta } from "../../auxiliar/respuesta";
import { ESTADO, MENSAJE_ERROR, MENSAJE_EXITOSO, TABLA } from "../../auxiliar/definicion";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { hayRequestBody } from "../../middlewares/hayRequestBody";
import { tipoBodyUsuario } from "../../middlewares/tipoBodyUsuario";
import jsonWebToken from "jsonwebtoken";
import { DynamoDBServiceException } from "@aws-sdk/client-dynamodb";
import { compararContrasenias, obtenerItems } from "../../database/database";

const ingresarUsuarioBase = async(event: { body: BodyUsuario }): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body;
    const usuarioCondicion: Condicion = {
      columna: "nombre",
      valor: body.nombre
    };
    const posibleUsuario: Usuario[] = await obtenerItems(TABLA.USUARIO, usuarioCondicion);
    if (!posibleUsuario.length)
      return respuesta(ESTADO.PROHIBIDO, MENSAJE_ERROR.USUARIO_NO_EXISTE, false);
    if (!await compararContrasenias(body.contrasenia ,posibleUsuario[0].contrasenia))
      return respuesta(ESTADO.PROHIBIDO, MENSAJE_ERROR.CONTRASENIA_INCORRECTA, false);
    const tareaCondicion: Condicion = {
        columna: "usuario",
        valor: body.nombre
    }
    const [usuario]: Usuario[] = posibleUsuario;
    const tareas: Tarea[] = await obtenerItems<Tarea>(TABLA.TAREA, tareaCondicion);
    const nuevousuario: RespuestaUsuario = {
      nombre: body.nombre,
      tareas, 
      token: jsonWebToken.sign(
        { 
          id: usuario.id, 
          nombre: usuario.nombre 
        }, 
        process.env.SECRETO! , 
        { 
          expiresIn : Number(process.env.EXPIRACION!)
        }
      ),
    };
    return respuesta<RespuestaUsuario>(ESTADO.OK, MENSAJE_EXITOSO.USUARIO_INGRESO, true, nuevousuario);

  } catch(error) {
    if (error instanceof DynamoDBServiceException)
      return respuesta(ESTADO.SERVER_ERROR, error.message, false);
    return respuesta(ESTADO.SERVER_ERROR, MENSAJE_ERROR.DB_FALLO, false);
  }
}

export const ingresarUsuario = middy(ingresarUsuarioBase)
.use(hayRequestBody())
.use(tipoBodyUsuario())
.use(jsonBodyParser());