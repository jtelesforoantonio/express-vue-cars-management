# Administración de Vehículos

Este proyecto se divide en dos.
1. Express API
2. Vue App

## Express API

El backend fue realizado usando el framework de ExpressJS,
una base de datos MySQL usando Sequelize como ORM.

```
Antes de comenzar primero tenemos que modificar el archivo config.json que se encuentra en
express-api/config este archivo tiene la configuración de la base de datos por lo que hay que
ingresar el usuario/contraseña para poder crear la base de datos.

Usuarios para ingresar el sistema:

Usuario Administrador
    correo: admin@gmail.com
    contraseña: developer
Usuario Normal
    correo: jonathan@gmail.com
    contraseña: developer
```

Dentro de la carpeta de express-api existe un script(deploy_project.sh) para el deploy del proyecto,
pero en caso de no funcionar xD podemos ejecutar los  siguientes comandos.

Instalación de dependencias
```shell
    yarn install
```

Creando la base de datos y ejecutando migraciones
```shell
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
```

Iniciando el proyecto, por defecto usara el puerto 3000
```shell
    yarn start
```

## Vue App

El frontend fue realizando con Vue, Vuex, Vue Router, Vuetify.

Al igual que en la API hay un script(deploy_project.sh) dentro de la carpeta vue-app,
pero en caso de no funcionar podemos ejecutar los  siguientes comandos.
```shell
    yarn install
```

Iniciando el proyecto
```shell
    yarn serve
```
