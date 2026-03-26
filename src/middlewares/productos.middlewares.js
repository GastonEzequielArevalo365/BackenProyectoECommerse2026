//Traemos todos los productos desde el archivo data para poder trabajar.
const productos = require('../../data/productos.json')

const middleware = {}

const validaExisteID = (req, res, next) => {
    const id = req.params.id
    //Usamos la función find para traer el primer producto cuyo id sea igual del que tenemos en el req
    const producto = productos.find( p => p.id == id)

    if(!producto)
        return res.status(404).json({error: `El producto con el ${id} no existe`})
    next()
}

middleware.validaExisteID = validaExisteID

const validarProductoBody = (req, res, next) => {
    const {nombre, precio} = req.body

    if(!nombre){
        return res.status(404).json({error: "El campo nombre es obligatorio"})
    }

    if(!precio){
        return res.status(404).json({error: "El campo precio es obligatorio"})
    }

    if(typeof precio !== "number"){
        return res.status(404).json({error: "El precio debe ser un número"})
    }

    next()
}

middleware.validarProductoBody = validarProductoBody


const validaNumeroDeId = (req,res,next) => {
    const {id} = req.params

    if(isNaN(id)){
        return res.status(400).json({error: "El ID debe ser un número"})
    }

    next()
}

middleware.validaNumeroDeId = validaNumeroDeId

const requestTime = (req,_,next) => {
    console.log({url: req.url, fechaHora: new Date() })
    next()
}

middleware.requestTime = requestTime



module.exports = middleware