const productos = require('../../data/productos.json')

const getAllProductos = (req, res)=>{
    res.status(200).json(productos)
}

const getProductoById = (req,res) => {
    const id = req.params.id
    const producto = productos.find(p => p.id == id)
    res.status(200).json(producto)
}

//Siempre dentro del module exports vamos a tener que mandar un objeto, para eso usamos las llaver, 
//para poder enviar las funciones como atributos de un objeto
//En realidad tendría que ser clave atributo valor por ej : getAllProductos:getAllProductos, pero como se llama igual lo ponemos solo una vez.
module.exports = {getAllProductos,getProductoById}