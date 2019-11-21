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