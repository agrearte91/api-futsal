import TorneoService from '../services/TorneoService';
import Util from '../utils/Utils';
import Partido from '../models/Partido';
import Torneo from '../models/Torneo';
import PartidoService from '../services/PartidoService';

const util = new Util();

class TorneoController {
    static async crearTorneo(req, res) {    
        try {    
            const nuevoTorneo = req.body;
            const torneoCreado = await TorneoService.agregarTorneo(nuevoTorneo);

            util.setSuccess(201,'Torneo añadido', torneoCreado);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async obtenerTorneos(req, res){
        try {
            const torneos = await TorneoService.obtenerTorneos();
            
            if(torneos && torneos.length > 0){
                util.setSuccess(200,'Torneos obtenidos',torneos);
            }
            else{
                util.setSuccess(200,'No se encuentran Torneos'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerTorneo(req, res){
        try {
            const anio = parseInt(req.params.anio);
            const tipo = req.params.tipo;
            const torneo = await TorneoService.obtenerTorneo(anio,tipo);
            
            if(torneo){
                util.setSuccess(200,'Torneo obtenido',torneo);
            }
            else{
                util.setError(404,`Torneo: "${tipo}" del año: "${anio}" no encontrado`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async eliminarTorneo(req, res){
        try {
            const tipo = req.params.tipo;
            const anio = parseInt(req.params.anio);
            const torneoEliminado = await TorneoService.eliminarTorneo(anio,tipo);

            if(torneoEliminado){
                util.setSuccess(200,'Torneo eliminado');
            }
            else{
                util.setError(404,`Torneo: "${tipo}" del año: "${anio}" no encontrado`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    } 

    static async actualizarTorneo(req, res){
        try {
            const anio = parseInt(req.params.anio);
            const tipo = req.params.tipo;
            const torneo = req.body;

            const torneoActualizado = await TorneoService.actualizarTorneo(anio,tipo,torneo);

            if(torneoActualizado){
                util.setSuccess(200,'Torneo actualizado',torneoActualizado);
            }
            else{
                util.setError(404,`Torneo: "${tipo}" del año: "${anio}" no encontrado`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
    
    static async obtenerCategorias(anio_torneo, tipo_torneo){

        const categorias = await TorneoService.obtenerCategorias(anio_torneo,tipo_torneo);
        return categorias;
    }

    static async obtenerListas(req,res){
        try {
            const anio_torneo = req.params.anio;
            const tipo_torneo = req.params.tipo;

            const listas = await TorneoService.obtenerListas(anio_torneo,tipo_torneo);
           
            if(listas){
                util.setSuccess(200,`Listas del torneo: "${tipo_torneo}" del año: "${anio_torneo}"`,listas);
            }
            else{
                util.setError(404,`Torneo: "${tipo_torneo}" del año: "${anio_torneo}" no encontrado`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerPartidosDeHoy(req,res){
        try {
            const partidos = await Partido.obtenerPartidosDeHoy();
           
            if(partidos){
                util.setSuccess(200,`Partidos de hoy `,partidos);
            }
            else{
                util.setError(404,`No se encontraron partidos de hoy`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
}

export default TorneoController;
