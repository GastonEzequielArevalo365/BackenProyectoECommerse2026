//Traemos la librería express que instalamos anteriormente con npm. Express nos ayuda a crear un servidor local y usar rutas de manera más fácil.
const express = require('express')

//Ejecutammos el siguiente comando que crea la aplicación web (Todavía no está escuchando nada, solo creando).
const app = express()

//Definimos el número de puerto.
const PORT = 3001

//Solo pones ./routes y automáticamente se lee el index de dicha carpeta.
const routes = require('./routes')

//Esta línea se pone a nivel app lo que hace es que todas las líneas que se reciban en el body las tome como una JSON
//app.use quiere decir ejecuta una funciín cuando llega una petición y coincide el path. No responde (a menos que vos lo hagas).
//En caso de express.json lee el body cuando viene en JSON y lo convierte a un objeto JS accesible en req.body.Si en el body no hay json no hay nada
app.use(express.json())

//Lo que hace en este caso es leer lo que hay dentro de cada una de las rutas y si hay alguna coincidencia con el path la app la ejecuta.
app.use(routes.productosRoute)

//Iniciamos el servidor y quedamos esperando el servidor solicitudes http.
//Como tenemos nodemon antes del index.js entiende que cada vez que tenemos un cambio se ejecuta nuevamente index.
app.listen(PORT, () => {
    console.log(`Aplicacion escuchando en el puerto ${PORT}`)
})  