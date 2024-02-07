
export enum MENSAJE_EXITOSO {
  INICIO = "API Tareas AWS",
  TAREA_AGREGADA = "Tarea agregada",
  TAREAS_OBTENIDAS = "Tareas obtenidas",
  TAREA_ACTUALIZADA = "Tarea actualizada",
  TAREA_ELIMINADA = "Tarea eliminada",
  USUARIO_AGREGADO = "Usuario agregado",
  USUARIO_INGRESO = "Usuario ingreso correctamente",
}

export enum MENSAJE_ERROR {
  REQUEST_BODY = "Es necesario enviar un request body",
  REQUEST_BODY_PROPERTIES = "El request body no cumple los requisitos",
  DB_FALLO = "Ocurrio un error con la base de datos",
  USUARIO_YA_REGISTRADO = "El usuario ya esta registrado",
  USUARIO_NO_EXISTE = "El usuario no existe",
  CONTRASENIA_INCORRECTA = "La contrasenia ingresada es incorrecta",
  TOKEN_NO_INGRESADO = "Es necesario enviar un token",
  TOKEN_INCORRECTO = "El token enviado es incorrecto"
}

export enum ESTADO {
  OK = 200,
  CREADO = 201,
  REQUEST_ERROR = 400,
  PROHIBIDO = 403,
  SERVER_ERROR = 500
}

export enum TABLA {
  USUARIO = "TareaUsuario",
  TAREA = "Tarea"
}