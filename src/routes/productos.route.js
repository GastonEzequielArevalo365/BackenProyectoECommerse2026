//Las rutas permite que tengamos una API organizada .
//Las rutas son endpoints que define el servidor para responder las solicitudes HTTP.
//Express nos facilida la creación y organización de las rutas.
//Usamos {Route} para solo traer ese objeto desde express.
//Lo que hacen las rutas son guiar hacia el controlador que va a ejecutar la función que genera la acción.

const {Router} = require('express')

const productosController = require('../controllers/productos.controller')

const route = Router()

route.get('/productos',productosController.getAllProductos)

//Usamos el :id porque lo que recibe como parámetro de la ruta pueden ser distintos valores.
route.get('/productos/:id',productosController.getProductoById)

module.exports = route