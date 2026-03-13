//Traemos la librería express que instalamos anteriormente con npm.
const express = require('express')

const productosRoute = require('./routes/productos.route')

//Ejecutammos el siguiente comando que crea la aplicación web (Todavía no está escuchando nada, solo creando).
const app = express()

//Definimos el número de puerto.
const PORT = 3001

app.use(productosRoute)

//Iniciamos el servidor y quedamos esperando el servidor solicitudes http.
//Como tenemos nodemon antes del index.js entiende que cada vez que tenemos un cambio se ejecuta nuevamente indes.
app.listen(PORT, () => {
    console.log(`Aplicacion escuchando en el puerto ${PORT}`)
})  