# Huellitas Cochalas

**Equipo:** Bit Buddies  
**Materia:** Programación Web  
**Descripción del Proyecto:** Aplicación para la adopción de animales

## Diagrama ER
![Diagrama ER](./DiagramaER.png)

## Descripción

Huellitas Cochalas es una aplicación web diseñada para facilitar la adopción de animales. La plataforma permite a los usuarios visualizar y buscar animales disponibles para adopción, y a los centros de rescate y cuidadores publicar animales en busca de un hogar. La app está desarrollada para ser intuitiva, fácil de usar y accesible desde dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend:** React, Material-UI
- **Backend:** Django
- **Base de Datos:** Postgresql

# Guía de Instalación para el Backend

## Instalación de PHP
1. **Descargar PHP**

   Descarga el archivo PHP preconfigurado desde el siguiente enlace:

   [Descargar PHP](https://drive.google.com/file/d/1WXSn380tURZefWoDg9i4443Rs8FJMQe9/view?usp=sharing)

2. **Descomprimir el Archivo**

   Extrae el contenido del archivo `php.zip` a una carpeta de su elección. Este archivo contiene una configuración de `php.ini` ya lista para usar (Este archivo ya esta configurado).

   
## Comandos Básicos para Usar Laravel

1. **Instalar Dependencias**

   Navega a la carpeta `backend` del repositorio y ejecuta el siguiente comando para instalar las dependencias de Laravel:

   ```sh
   cd backend
   composer install
   ```
2. **Migrar la Base de Datos**

   ```sh
   php artisan migrate
   ```
3. **Comando para habilitar las imagenes**
    ```sh
    php artisan storage:link
    ```

4. **Iniciar el Servidor de Desarrollo**

   Finalmente, inicia el servidor de desarrollo de Laravel con el siguiente comando:

   ```sh
   php artisan serve
   ```

   Por defecto, el servidor estará disponible en http://localhost:8000.

   
# Guía de Instalación para el Frontend

1. **Instalar Node.js**

   Descarga e instala Node.js 20 LTS desde el sitio oficial:

   [Descargar Node.js](https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi)

2. **Instalar Dependencias del Proyecto**

   Navega a la carpeta `frontend` del repositorio y

   ```sh
   cd frontend
   npm install
   ```

3. **Iniciar el Servidor de Desarrollo**

   Inicia el servidor de desarrollo de React con el siguiente comando:

   ```sh
   npm start
   ```

   Por defecto, el servidor estará disponible en http://localhost:3000.


## Comandos Docker
Para construir las imágenes de los servicios, utiliza:

```sh
docker-compose build
```

Para levantar los servicios con Docker Compose, utiliza el siguiente comando:

```sh
docker-compose up -d
```

Para detener los servicios, utiliza:

```sh
docker-compose down
```

Para acceder a un contenedor en ejecución y abrir una terminal bash, utiliza:

```sh
docker-compose exec -it huellitas-backend /bin/bash
```