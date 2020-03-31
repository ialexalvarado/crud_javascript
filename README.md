# CRUD usuarios

Aplicación web para CRUD de usuarios en agular con nodejs

## Instalación

Tener previamente instalado nodejs y correr el siguiente comando en consola

```bash
npm install -g @angular/cli
```

Despues de esto, ubicarse dentro de la carpeta 'crud' y 'ws crud' y correr el siguiente comando en cada carpeta

```bash
npm install
```

## BD

correr el script dbpersonal.sql en mysql para crear la base de datos, tabla y registros

## Cambiar conexión de bd

en el archivo ubicado en 'ws crud\server\conf\conf.js' modificar las conexiones del server, usuario y contraseña para poder interactuar con la bd y la aplicación


## Iniciar aplicación

ubicarse dentro de la carpeta 'crud' y correr el comando
```bash
ng serve
````


ubicarse dentro de la carpeta 'ws crud' y correr el comando
```bash
node app.js
````
o

```bash
nodemon app.js
````

Fin del readme :)
