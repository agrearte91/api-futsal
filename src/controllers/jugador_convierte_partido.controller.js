import Util from '../utils/Utils';
import Jugador_convierte_PartidoService from '../services/Jugador_convierte_PartidoService';

const util = new Util();

class Jugador_convierte_PartidoController {
    static async crearTupla(req, res) {    
        try {    
            const nuevaTupla = req.body;
            const tuplaCreada = await Jugador_convierte_PartidoService.agregarTupla(nuevaTupla);

            util.setSuccess(201,'Tupla añadida',tuplaCreada);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async crearTuplas(req, res) {    
        //Recibe un arreglo objetos Tuplas (id_jugador, goles) para ser creados, se insertan todos (si no hay error), o ninguno (si hay error)
        try {    
            const nuevasTuplas = req.body;
            const tuplasCreadas = await Jugador_convierte_PartidoService.agregarTuplas(nuevasTuplas);
            util.setSuccess(201,'Tuplas (id_jugador-goles) añadidos',tuplasCreadas);
            return util.send(res);
        }
        catch (error){
            util.setError(400,"No se añadieron los tuplas (id_jugador-goles): "+error.message);
            return util.send(res);
        }
    }

    static async obtenerTuplas(req, res){
        try {
            const tuplas = await Jugador_convierte_PartidoService.obtenerTuplas();
            
            if(tuplas && tuplas.length > 0){
                util.setSuccess(200,'Tuplas (jugador-goles) obtenidas',tuplas);
            }
            else{
                util.setSuccess(200,'No se encuentran Tuplas (jugador-goles)'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerTuplasEnPartido(req, res){
        try {
            const id_partido = req.params.id_partido;
            const tuplas = await Jugador_convierte_PartidoService.obtenerTuplasEnPartido(id_partido);
            
            if(tuplas && tuplas.length > 0){
                util.setSuccess(200,`Tuplas (jugador-goles) del partido con id: ${id_partido} obtenidas`, tuplas);
            }
            else{
                util.setSuccess(200,`No se encuentran Tuplas (jugador-goles) en el partido con id: '${id_partido}`); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerTupla(req, res){
        try {
                const dni_jugador = req.params.dni_jugador;
                const id_partido = req.params.id_partido;
                const tupla = await Jugador_convierte_PartidoService.obtenerTupla(dni_jugador,id_partido);

            if(tupla){
                util.setSuccess(200,'Tupla (dni_jugador, goles) obtenida',tupla);
            }
            else{
                util.setError(200,`Tupla (dni_jugador, goles)  no encontrada`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
}

export default Jugador_convierte_PartidoController;
