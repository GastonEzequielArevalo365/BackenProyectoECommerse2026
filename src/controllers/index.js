//En esta línea vamos a traer el objeto que exportamos de los controladores productos
const productosController = require('./productos.controller')

//No lo exportamos como objeto como lo haríamos desde rutas porque ya es un objeto al salir de pruductos.
module.exports = productosController