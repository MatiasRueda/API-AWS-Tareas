# API AWS Tareas
![Static Badge](https://img.shields.io/badge/Estado%20-%20Terminado%20-%20green)
## Introducción
Proyecto personal para aplicar mis conocimientos en AWS y Serverless.
La API ofrece a los usuarios la posibilidad de guardar tareas, actualizarlas y eliminarlas. </br>
Para esto será necesario que se registren e ingresen
</br>

## Tabla de contenido
* [Introducción](#Introducción)
* [Tipo de proyecto](#Tipo-de-proyecto)
* [Tabla de contenido](#Tabla-de-contenido)
* [Tecnologías utilizadas](#Tecnologías-utilizadas)
* [Estructura](#Estructura)
* [Instalación](#Instalación)
* [Uso](#Uso)
* [Peticiones](#Peticiones)

</br>

## Tipo de proyecto
Proyecto individual.

</br>

## Tecnologías utilizadas
  - NodeJS
  - TypeScript
  - JWT
  - Serverless
  - AWS
  - AWS Lambda
  - AWS API Gateway
  - AWS S3
  - AWS DynamoDB
</br>

## Estructura

```
API-AWS-Tareas
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ README.md
├─ serverless.yml
└─ src
   ├─ auxiliar
   │  ├─ definicion.ts
   │  ├─ respuesta.ts
   │  └─ types.ts
   ├─ controller
   │  ├─ delete
   │  │  └─ eliminarTarea.ts
   │  ├─ post
   │  │  ├─ agregarTarea.ts
   │  │  ├─ ingresarUsuario.ts
   │  │  └─ registrarUsuario.ts
   │  └─ put
   │     └─ actualizarTarea.ts
   ├─ database
   │  └─ database.ts
   ├─ index.ts
   └─ middlewares
      ├─ hayRequestBody.ts
      ├─ tipoBodyTarea.ts
      ├─ tipoBodyUsuario.ts
      ├─ tipoTarea.ts
      ├─ verificarTareaToken.ts
      └─ verificarToken.ts

```
</br>

## Instalación 
Es necesario instalar node, para eso es necesario ir a la siguiente pagina y descargarlo:
https://nodejs.org/en </br>
Una vez clonado el repositorio o descargado el zip ( y después de extraerlo ). 
Abrir la terminal en la carpeta donde se clono ( o se extrajo ) y escribir el siguiente comando.
```
npm i
```
Esto instalara las dependencias que el proyecto necesita

</br>

## Uso
Hay dos formas de usar la API<br/>
**Local**:

Para poder utilizar el proyecto es necesario tener una conexión a una base de datos y aplicar el siguiente comando:
```
npm run dev
```

**En linea**:  
En caso de querer utilizarla en linea dirigirse a la siguiente dirección:
```
https://82imkjzfa5.execute-api.sa-east-1.amazonaws.com
```


</br>


## Peticiones
Puede utilizar programas como PostMan , ThunderClient o el navegador ( en caso de que lo este utilizando la API en linea ).</br>
Para poder realizar las peticiones debe seguir el siguiente el siguiente patrón: 
```
https://{api}{endpoint}
```
Por ejemplo en caso de estar utilizando en linea y quiera ingresar un usuario:
```
https://82imkjzfa5.execute-api.sa-east-1.amazonaws.com/api/ingresarUsuario
```

### Tipo de datos
Distintos tipos de datos que se manejan en todo el proyecto

#### RespuestaUsuario
Propiedad | Tipo | Descripción
-------- | ----  | ------
`nombre` | String | Identificador del usuario para el usuario. 
`tareas` | Tarea[] |  Todas las tareas del usuario.
`token` | String |  Identificador que el usuario tendrá para agregar, eliminar o actualizar tareas. 


#### Tarea
Propiedad | Tipo| Descripción
-------- | ---- |  -----------
`id` | String | Identificador de la tarea.
`titulo` | String | Nombre de la tarea.
`descripcion` | String | Describe la tarea.
`usuario` | String | Usuario al que pertenece la tarea.
`realizado` | Boolean | Necesario para saber si se realiza la tarea o no.

#### Respuesta

Propiedad | Tipo| Descripción
-------- | ---- |  -----------
`data` | any o Undefined | La información que pide el usuario.
`message` | String | Texto para que lea el usuario.
`success` | Boolean | Muestra si la operación se realiza con éxito.


### Error
En caso de ocurrir algún error se enviara el siguiente Json ( tipo <a href="#respuesta">Respuesta</a> )
:
```json
{
  "success": false,
  "message": "No se enviaron datos"
}
```
> Es solo un ejemplo el mensaje de error puede variar

</br>

###  POST
#### Ingresar usuario
**Endpoint**: "/api/ingresarUsuario " </br>
Un usuario puede recuperar sus datos
El Request Body que se debe enviar:
```json
{
	"nombre": "Matias",
	"contrasenia": "123456789"	
}
```
> Es solo un ejemplo los valores del Request Body pueden variar

Propiedad | Tipo| Requerido |Descripción
-------- | ---- | :------: | -----------
`nombre` | String |  ✔ |Identificador para que vean los demás usuarios.
`contrasenia` | String |  ✔ | Contraseña ingresada por el fue usuario.

En caso de que todo haya salido bien se tendrá una <a href="#respuesta">**Respuesta**</a> de este estilo:
```json
{
  "message": "Usuario ingreso correctamente",
  "success": true,
  "data": {
    "nombre": "Matias",
    "tareas": [
      {
        "descripcion": "123411551511515",
        "usuario": "Matias",
        "id": "21274996-3c2c-4cae-b51a-4879f43a02f8",
        "titulo": "Prueba",
        "realizado": false
      },
      {
        "descripcion": "123",
        "usuario": "Matias",
        "titulo": "Hola",
        "id": "5bd85ca8-49bd-4893-8299-b2ab2f0dc7b2",
        "realizado": false
      }
    ],
    "token": "123"
  }
}
```
> Es solo un ejemplo el mensaje, al igual que data pueden variar

En este caso **data** es de tipo <a href="#respuestausuario">**RespuestaUsuario**</a>

</br>

#### Registrar usuario
**Endpoint**: "/api/registrarUsuario" </br>
Un usuario ingresa a la base datos
El Request Body que se debe enviar:
```json
{
  "nombre": "Pepe3",
  "contrasenia": "123"
}
```
> Es solo un ejemplo los valores del Request Body pueden variar

Propiedad | Tipo| Requerido | Descripción
-------- | ---- | :------: | -----------
`nombre` | String |  ✔ | Identificador para que vean los demás usuarios.
`contrasenia` | String |  ✔ | Contraseña ingresada por el fue usuario.


En caso de que todo haya salido bien se tendrá una <a href="#respuesta">**Respuesta**</a> de este estilo:
```json
{
  "message": "Usuario agregado",
  "success": true
}
```
> Es solo un ejemplo el mensaje puede variar

</br>

#### Agregar Tarea
**Endpoint**: "/api/auth/agregarTarea " </br>
Se agrega una tarea, es necesario estar autenticado
Es necesario enviar en el header el token de la siguiente manera 
```json
{
	"Authorization": "123"
}
```
> En este caso "123" representa al token que se debe enviar

El Request Body que se debe enviar:
```json
{
  "titulo": "Universidad",
  "descripcion": "Estudiar para los finales"
}
```
> Es solo un ejemplo los valores del Request Body pueden variar

Propiedad | Tipo| Requerido | Descripción
-------- | ---- | :------: | -----------
`titulo` | String |  ✔ | Es el nombre de la tarea.
`descripcion` | String |  ✔ | Describe sobre lo que trata la tarea.


En caso de que todo haya salido bien se tendrá una  <a href="#respuesta">**Respuesta**</a> de este estilo:
```json
{
  "message": "Tarea agregada",
  "success": true,
  "data": {
    "id": "0f0ad97c-76f5-46fb-80b0-427869c34a6e",
    "usuario": "Matias",
    "titulo": "Universidad",
    "descripcion": "Estudiar para los finales",
    "realizado": false
  }
}
```
> Es solo un ejemplo el mensaje puede variar

En este caso en la  <a href="#respuesta">**Respuesta**</a> la propiedad **data** es de tipo <a href="#tarea">**Tarea**</a> 

</br>

### PUT
#### Actualizar tarea
**Endpoint**: "/api/auth/actualizarTarea " </br>
Modifica los valores de la tarea que se elija
Es necesario enviar en el header el token de la siguiente manera 
```json
{
	"Authorization": "123"
}
```
El Request Body que se debe enviar:

```json
{
    "id": "0f0ad97c-76f5-46fb-80b0-427869c34a6e",
    "usuario": "Matias",
    "titulo": "Universidad",
    "descripcion": "Ya estudie",
    "realizado": true
}
```
> Es solo un ejemplo los valores del Request Body pueden variar

En este caso el Request Body es de tipo **Tarea**  ( tipo <a href="#tarea">Tarea</a> )

En caso de que todo haya salido bien se tendrá una respuesta de este estilo:
```json
{
  "message": "Tarea actualizada",
  "success": true,
  "data": {
    "descripcion": "Ya estudie",
    "usuario": "Matias",
    "id": "0f0ad97c-76f5-46fb-80b0-427869c34a6e",
    "titulo": "Universidad",
    "realizado": true
  }
}
```
En este caso en la  <a href="#respuesta">**Respuesta**</a> la propiedad **data** es de tipo <a href="#tarea">**Tarea**</a>  
> Es solo un ejemplo el mensaje puede variar

</br>

### DELETE
#### Actualizar usuario
**Endpoint**: "/api/auth/eliminarTarea/{id} " </br>
Elimina una tarea.
Es necesario enviar en el header el token de la siguiente manera 
```json
{
	"Authorization": "123"
}
```
En caso de que todo haya salido bien se tendrá una <a href="#respuesta">**Respuesta**</a> de este estilo:
```json
{
  "message": "Tarea eliminada",
  "success": true
}
```
> Es solo un ejemplo el mensaje puede variar
