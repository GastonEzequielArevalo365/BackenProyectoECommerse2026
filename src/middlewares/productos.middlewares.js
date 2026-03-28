//Traemos todos los productos desde el archivo data para poder trabajar.
const productos = require('../../data/productos.json')

const middleware = {}


//En el siguiente middleware vamos a validar si existe el id que recibimos de la URL
const validaExisteID = (req, res, next) => {
    const id = req.params.id
    //Usamos la función find para traer el primer producto cuyo id sea igual del que tenemos en el req
    const producto = productos.find( p => p.id == id)

    if(!producto)
        return res.status(404).json({error: `El producto con el ${id} no existe`})
    next()
}

middleware.validaExisteID = validaExisteID

//En el siguiente middleware vamos a validar que lo que le pasemos en el body sea correcto
const validarProductoBody = (req, res, next) => {
    //Traemos el nombre y el precio del body
    const {nombre, precio} = req.body

    if(!nombre){
        return res.status(404).json({error: "El campo nombre es obligatorio"})
    }

    if(!precio){
        return res.status(404).json({error: "El campo precio es obligatorio"})
    }

    //Typeof es un operador que nos devuelve el tipo de la variable que le pasemos a continuación
    if(typeof precio !== "number"){
        return res.status(404).json({error: "El precio debe ser un número"})
    }

    next()
}

middleware.validarProductoBody = validarProductoBody

//En el siguiente middleware vamos a validar que el ID que recibimos del URL sea un válido
const validaNumeroDeId = (req,res,next) => {
    //Traemos el ID de la URL
    const {id} = req.params

    //isNaN es una función que verifica si un valor NO es un número válido; si el valor no se puede convertir en númera da TRUE
    //Ej: isNaN id = False en cambio isNaN "Hola" = True porque "Hola" no puede ser un número
    if(isNaN(id)){
        return res.status(400).json({error: "El ID debe ser un número"})
    }

    next()
}

middleware.validaNumeroDeId = validaNumeroDeId

const tiempoDeRespuesta = (req,res,next) =>{
    //Date.now() nos devuelve le número en milisegundos que tenemos desde 1940, por ej 17100000000
    const inicio = Date.now()
    //res.on. res puede emitir un evento y con .on() podemos escribir ese evento
    //Ojo! 'finish' es una palabra clave que espera que express le avise a traves de un red.end() que ejecuta express cuando ya no hay controladores que ejecutar.
    res.on('finish', ()=>{
        //Acá usamos otro Date.now()m si el primero nos devolvía 17100000000 este devuelve 1710000213 (Ejemplo)
        const duracion = Date.now() - inicio   
        //Acá imprimmos el method, get-post-    
        //La ruta
        //La duración
        console.log(`${req.method} ${req.originalUrl} - ${duracion}ms`)
    })

    next()
}

middleware.tiempoDeRespuesta = tiempoDeRespuesta

//El errorHandler es un middleware especial de 4 parametros, al tener 4 parámetros express lo reconoce como un middleware especial
//Este middleware se utiliza para visualizar errores de maneras mas legible.
const errorHandler = (err,req,res,next) => {
    //La siguien linea imprime el error del servidor en la consola.
    console.error(err)

    //Respuesta al cliente, el status 500 es error interno en el servidor.
    res.status(500).json({
        error: "Error interno del servidor"
    })
}

middleware.errorHandler = errorHandler

//El middleware notFound se ocupa de las rutas no encontradas.
const notFound = (req, res, next) => {
    //El status 404 significa ruta no encontrada.
    res.status(404).json({
        error: "Ruta no encontrada"
    })
}

middleware.notFound = notFound

//En el siguiente middleware vamos a validar si el campo que nos están mandando es el correcto.
const validarCampo = (campo) => {
    //Usamos return para cortar la ejecución cuando tengamos el error.
    return (req,res,next) =>{
        //Usamos corchetes porque el campo es una variable y el corchete permite que tome el valor del campo que querramos.
        if(!req.body[campo]){
            return res.status(400).json({
                error: `El campo ${campo} es obligatorio`
            })
        }
        next()
    }
}

middleware.validarCampo = validarCampo


module.exports = middleware