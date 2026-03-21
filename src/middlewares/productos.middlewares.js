const {productos} = require('../controllers/productos.controller')

const middleware = {}

const validaExisteID = (req, res, next) => {
    const id = req.params.id
    const producto = productos.find( p => producto.id == id)
    if(!producto)
        return res.status(404).json({mensaje: `El ${id} no existe`})
    next()
}

middleware.validaExisteID = validaExisteID

const requestTime = (req,res,next) => {
    console.log({url: req.url, fechaHora: new Date() })
    next()
}

middleware.requestTime = requestTime



module.exports = middleware