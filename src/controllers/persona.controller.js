import Persona from '../models/Persona';


export async function crearPersona(req, res) {
    const { dni, nombre, apellido, fecha_nacimiento, telefono } = req.body;
    console.log(req.body)
    try {
        let nuevaPersona = await Persona.create({
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            telefono
        })
        console.log(nuevaPersona)
        if (nuevaPersona) {
            res.json({
                mensaje: 'todo piola',
                data: nuevaPersona
            })
        }


    } catch (e) {
        res.status(500).json({
            mensale: 'todo mal',
            data: {}

        })
    }

}

export async function obtenerPersonas(req, res){
    try {
        let personas = await Persona.findAll();
        if(personas){
            res.json({
                data : personas
            })
        }
        
    } catch (error) {
        {
            res.status(500).json({
                mensaje: error
            })
        }
    }
}

export async function obtenerPersona(req, res){
    const dni = req.params.dni;

    try {
        let persona = await Persona.findByPk(dni);

        if(persona){
            res.json({
                data : persona
            })
        }

        throw new Error("Persona no encontrada");
        
    } catch (error) {
        {
            res.status(500).json({
                mensaje: error.message
            })
        }
    }
}


export async function eliminarPersona(req, res){
    try {
        const dni = req.params.dni;
        console.log(dni);
        const deleted = await Persona.destroy({
            where: { dni: dni}
          });
        
        if (deleted){
            return res.json({
                mensaje: 'eliminado, todo piola'
            })
        }
        
        else{
            throw new Error("Persona no encontrada");
        }

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        })
    }    
}

export async function actualizarPersona(req, res) {
    const dni = req.params.dni;
   
    try{
        const [ updated ] = await Persona.update(req.body, {
            where: { dni: dni }
          });

        if (updated){
            const updatedPost = await Persona.findOne({ where: { dni: dni } });
            return res.json({
                mensaje: 'actualizado, todo piola',
                data: updatedPost
            })
        }
        
        throw new Error("Persona no encontrada");
    }
    
    catch (e) {
        res.status(500).json({
            mensale: e.message,
            data: {}

        })
    }
}