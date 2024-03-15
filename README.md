# TODO API

## Development

### Local
- Instala las dependencias: `npm i`
- Crea tu archivo **.env** a partir del archivo **example.env**
- Genera tu **JWT_SECRET** con el comando:`npm run generate:secret`
- [OPCIONAL] Agrega tu **SWAGGER_BASE_DIR** si quieres activar la UI de Swagger. Esta variable debe tener la direccion absoluta de nuestro proyecto, la puedes obtener ejecutando `pwd` para sistemas Unix y `dir` para sistemas Windows. Ejemplo: **SWAGGER_BASE_DIR="/home/mypc/nodejs/academia/todo-app-challenge"**
- [OPCIONAL] Puedes canbiar el puerto agregando **PORT** a tu **.env** Ejemplo: `PORT="8081"`
- Levanta el servidor con el comando: `npm run dev`

### Podman/Docker
> Si usas Docker en vez de Podman solo cambialo en los comandos del archivo **package.json**.
> Ejemplo: ~~`podman build -t todo-app .`~~ -> `docker build -t todo-app .`
- Genera la imagen del proyecto: `image:build`
- Generando el contenedor: `container:start`