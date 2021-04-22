import JugadorService from '../services/JugadorService';
import Util from '../utils/Utils';
import Jugador from '../models/Jugador';

const util = new Util();

class JugadorController {
    static async crearJugador(req, res) {    
        try {    
            const nuevoJugador = req.body;
            const jugadorCreado = await JugadorService.agregarJugador(nuevoJugador);

            util.setSuccess(201,'Jugador añadido',jugadorCreado);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async crearJugadores(req, res) {    
        //Recibe un arreglo objetos JUGADOR para ser creados, se insertan todas (si no hay error), o ninguno (si hay error)
        try {    
            const nuevosJugadores = req.body;
            const jugadoresCreados = await JugadorService.agregarJugadores(nuevosJugadores);
            util.setSuccess(201,'Jugadores añadidos',jugadoresCreados);
            return util.send(res);
        }
        catch (error){
            util.setError(400,"No se añadieron los jugadores: "+error.message);
            return util.send(res);
        }
    }

    static async obtenerJugador(req, res){
        try {
            const dni = req.params.dni;
            const jugador = await JugadorService.obtenerJugador(dni);
            
            if(jugador){
                util.setSuccess(200,'Jugador obtenido',jugador);
            }
            else{
                util.setError(404,`Jugador con dni: ${dni} no encontrado`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerJugadorPersona(req,res){
        try {
            const dni = req.params.dni;
            const jugador = await JugadorService.obtenerJugador(dni);
            if (jugador){
                const persona = await jugador.getPersona();
                //console.log("persona obtenida:",persona.dataValues);
                util.setSuccess(200,'Datos completos del jugador',)
            }


        } catch (error) {
            
        }
    }

    static async obtenerJugadores(req, res){
        try {
            const jugadores = await JugadorService.obtenerJugadores();
            
            if(jugadores && jugadores.length > 0){
                util.setSuccess(200,'Jugadores obtenidos',jugadores);
            }
            else{
                util.setSuccess(200,'No se encuentran Jugadores'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async actualizarJugador(req, res){
        //preguntar por cambios de dni ? 
        try {
            const dni = req.params.dni;
            const jugador = req.body;

            const jugadorActualizado = await JugadorService.actualizarJugador(dni,jugador);

            if(jugadorActualizado){
                util.setSuccess(200,'Jugador actualizado',jugadorActualizado);
            }
            else{
                util.setError(404,`Jugador con dni: ${dni} no encontrado `);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async eliminarJugador(req, res){
        try {
            const dni = req.params.dni;
            const jugadorEliminado = await JugadorService.eliminarJugador(dni);

            if(jugadorEliminado){
                util.setSuccess(200,'Jugador eliminada');
            }
            else{
                util.setError(404,`Jugador con dni: ${dni} no encontrado `);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
}


export default JugadorController;
