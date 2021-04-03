import PersonaService from '../services/PersonaService';
import Util from '../utils/Utils';

const util = new Util();

class PersonaController {
    static async crearPersona(req, res) {    
        try {    
            const nuevaPersona = req.body;
            const personaCreada = await PersonaService.agregarPersona(nuevaPersona);
            
            util.setSuccess(201,'Persona añadida',personaCreada);            
            
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async crearPersonas(req, res) {    
        //Recibe un arreglo objetos Persona para ser creadas, se insertan todas (si no hay error), o ninguna (si hay error)
        try {    
            const nuevasPersonas = req.body;
            const personasCreadas = await PersonaService.agregarPersonas(nuevasPersonas);
            util.setSuccess(201,'Personas añadidas',personasCreadas);
            return util.send(res);
        }
        catch (error){
            util.setError(400,"No se añadieron las personas: "+error.message);
            return util.send(res);
        }
    }

    static async obtenerPersonas(req, res){
        try {
            const personas = await PersonaService.obtenerPersonas();
            
            if(personas && personas.length > 0){
                util.setSuccess(200,'Personas obtenidas',personas);
            }
            else{
                util.setSuccess(200,'No se encuentran Personas'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerPersona(req, res){
        try {
            const dni = req.params.dni;
            const persona = await PersonaService.obtenerPersona(dni);
            
            if(persona){
                util.setSuccess(200,'Persona obtenida',persona);
            }
            else{
                util.setError(404,`Persona con dni: ${dni} no encontrada `);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async actualizarPersona(req, res){
        //preguntar por cambios de dni ? 
        try {
            const dni = req.params.dni;
            const persona = req.body;

            const personaActualizada = await PersonaService.actualizarPersona(dni,persona);

            if(personaActualizada){
                util.setSuccess(200,'Persona actualizada',personaActualizada);
            }
            else{
                util.setError(404,`Persona con dni: ${dni} no encontrada `);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async eliminarPersona(req, res){
        try {
            const dni = req.params.dni;
            const personaEliminada = await PersonaService.eliminarPersona(dni);

            if(personaEliminada){
                util.setSuccess(200,'Persona eliminada');
            }
            else{
                util.setError(404,`Persona con dni: ${dni} no encontrada `);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

}

export default PersonaController;
