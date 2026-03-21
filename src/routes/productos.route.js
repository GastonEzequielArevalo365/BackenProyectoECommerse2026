//Las rutas permite que tengamos una API organizada .
//Las rutas son endpoints que define el servidor para responder las solicitudes HTTP.
//Express nos facilida la creación y organización de las rutas.
//Usamos {Route} para solo traer ese objeto desde express.
//Lo que hacen las rutas son guiar hacia el controlador que va a ejecutar la función que genera la acción.

const {Router} = require('express')

//Traemos el objeto con los controladores del index de dicha carpeta (También podemos traer todo lo que necesitemos para desarrollar).
const productosController = require('../controllers')
const productosMiddlewares = require('../middlewares/productos.middlewares')

//La siguiente línea ejecuta la funcion Router de express que separa y distingue que nuestra ruta actual es para productos.
const route = Router()

//route.use(productosMiddlewares.requestTime)

route.get('/productos',productosController.getAllProductos)

//Usamos el :id porque lo que recibe como parámetro de la ruta pueden ser distintos valores.
route.get('/productos/:id',productosController.getProductoById)

route.delete('/productos/:id', productosController.deleteProductoById)

route.post('/productos',productosController.crearProducto)

//En el module exportando todas las rutas para ver cual encaja con la petición http
module.exports = route