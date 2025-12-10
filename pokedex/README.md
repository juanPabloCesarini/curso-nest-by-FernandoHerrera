<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
  ```
  npm i -g @nestjs/cli
  ```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar a __.env__

6. Llenar las variables de entorno en el ```.env```

7. Ejecutar la app en dev:
   
```
npm run start:dev
```

8. Cargar el seed

```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest