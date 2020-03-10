import PartidoService from '../services/PartidoService';
import Util from '../utils/Utils';
import Partido from '../models/Partido';

const util = new Util();

class PartidoController {
    static async crearPartido(req, res) {    
        try {    
            const nuevoPartido = req.body;
            const partidoCreado = await PartidoService.agregarPartido(nuevoPartido);

            util.setSuccess(201,'Partido añadido',partidoCreado);
            return util.send(res);
        }   
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async obtenerPartidos(req, res){
        try {
            const partidos = await PartidoService.obtenerPartidos();
            
            if(partidos && partidos.length > 0){
                util.setSuccess(200,'Partidos obtenidos',partidos);
            }
            else{
                util.setSuccess(200,'No se encuentran Partidos'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerPartido(req, res){
        try {

            const id_partido = req.params.id;
            const partido = await PartidoService.obtenerPartido(id_partido);

            
            /* const arbitro = await partido.getArbitro();  //datos del árbitro
            const asistente = await partido.getAsistente(); //datos del asistente
            
            console.log("Datos del partido ",arbitro.dataValues,asistente.dataValues); */
            
            if(partido){
                util.setSuccess(200,'Partido obtenido',partido);
            }
            else{
                util.setError(404,`Partido no encontrado`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
   
    static async actualizarPartido(req, res){
        try {
            const id_partido = req.params.id;
            const partido = req.body;
            const partidoActualizado = await PartidoService.actualizarPartido(id_partido,partido);

            if(partidoActualizado==0){
                util.setError(400,`Partido con id:"${id_partido}" no se pudo actualizar. Chequear parámetros`);
            }
            else{
                if(partidoActualizado==null){
                    util.setError(404,`Partido con id:"${id_partido}" no encontrado`);
                }
                else{
                    util.setSuccess(200,'Partido actualizado',partidoActualizado);
                }
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);
            return util.send(res);
        }
    }

    static async eliminarPartido(req, res){
        try {
            const id_partido = req.params.id;
            const partidoEliminado = await PartidoService.eliminarPartido(id_partido);

            if(partidoEliminado){
                util.setSuccess(200,'Partido eliminado');
            }
            else{
                util.setError(404,`Partido con id: ${dni} no encontrado`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
}

export default PartidoController;
