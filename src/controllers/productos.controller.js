const productos = require('../../data/productos.json')

const controller = {}

const getAllProductos = (req, res)=>{
    res.status(200).json(productos)
}

controller.getAllProductos = getAllProductos

const getProductoById = (req,res) => {
    //Acá traemos el producto por el ID y consultamos con un find si hay alguno con ese mismo ID
    const id = req.params.id
    const producto = productos.find(p => p.id == id)
    res.status(200).json(producto)
}

controller.getProductoById = getProductoById

const deleteProductoById = (req,res) => {
    //Traemos el producto que recibimos por la petición HTTP y consultamos con un findIndex si hay alguno con ese mismo ID
    //Usamos findIndex para traer el indice del objeto donde vamos a encontrar el producto.
    const id = req.params.id
    const producto = productos.findIndex(p => p.id == id)
    productos.splice(producto,1)
    res.status(204)
}

controller.deleteProductoById = deleteProductoById

const crearProducto = (req,res) => {
    //Traemos todos los atributos que le vamos a pasar por el body mediante el body.
    //Usamos un map para traer todos los id de los productos que tenemos en nuestro json de productos
    //Usamos una ternaria para corroborar que haya algún producto en el array ids y en caso no haber crea el primero
    // en caso de haber me trae el último de los ids y les suma 1 para crear el siguiente
    const {nombre,caracteristicas,precio,estado,categoria_id} = req.body
    const ids = productos.map(p => p.id)
    const producto = {
        id : ids.length == 0 ? 1 : Math.max(...ids ) + 1,
        nombre,
        caracteristicas,
        precio,
        estado,
        categoria_id
    } 
    productos.push(producto)
    res.status(201).json(producto)
}

controller.crearProducto = crearProducto

//Siempre dentro del module exports vamos a tener que mandar un objeto, para eso usamos las llaves, para poder enviar las funciones como atributos de un objeto
//Creamos el objeto controller para luego poner cada constante que apunta a la función.
module.exports = controller