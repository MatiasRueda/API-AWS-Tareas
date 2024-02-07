export type BodyTarea = {
  titulo: string;
  descripcion: string;
}

export interface Tarea extends BodyTarea {
  id: string;
  usuario: string;
  realizado: boolean;
}

export type BodyUsuario = {
  nombre: string;
  contrasenia: string;
}

export interface Usuario extends BodyUsuario { 
  id: string;
}

export type RespuestaUsuario = {
  nombre: string;
  tareas: Tarea[];
  token: string;
}

export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never; 
}[keyof T]

export type Condicion = {
  columna: string;
  valor: string;
}