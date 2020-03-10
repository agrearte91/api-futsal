import ListaInscripcionService from '../services/ListaInscripcionService';
import Util from '../utils/Utils';
import Jugador_integra_ListaService from '../services/Jugador_integra_ListaService';

const util = new Util();

class ListaInscripcionController {
    static async crearListaInscripcion(req, res) {    
        try {    
            const nuevaListaInscripcion = req.body;
            const ListaInscripcionCreada = await ListaInscripcionService.agregarListaInscripcion(nuevaListaInscripcion);

            util.setSuccess(201,'ListaInscripcion añadida',ListaInscripcionCreada);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async agregarJugadoresEnLista(req,res){
        try {
            const id_lista = req.params.id;
            const lista = await ListaInscripcionService.obtenerListaInscripcion(id_lista);
            const jugadores = req.body;

            if (lista){
                await Jugador_integra_ListaService.agregarJugadoresEnLista(id_lista,jugadores);
                util.setSuccess(201,`Jugadores añadidos a la lista: ${id_lista} `,jugadores);
            }
            else{
                util.setError(404,'No se encuentra lista de Inscripción'); 
            }
            return util.send(res);

        } catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerListasInscripcion(req, res){
        try {
            const listasInscripcion = await ListaInscripcionService.obtenerListasInscripcion();
            
            if(listasInscripcion && listasInscripcion.length > 0){
                util.setSuccess(200,'Listas de Inscripción obtenidas',listasInscripcion);
            }
            else{
                util.setError(404,'No se encuentran Listas de Inscripción'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerListaInscripcion(req, res){
        try {
            const id_lista = req.params.id;
            const listaInscripcion = await ListaInscripcionService.obtenerListaInscripcion(id_lista);

            if(listaInscripcion) {
                util.setSuccess(200,'ListaInscripcion obtenida',listaInscripcion);
            }
            else{
                util.setError(404,`ListaInscripcion no encontrada`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async actualizarListaInscripcion(req, res){

        try {
            const id_listaInscripcion = req.params.id;
            const listaInscripcion = req.body;
            const listaInscripcionActualizada = await ListaInscripcionService.actualizarListaInscripcion(id_listaInscripcion,listaInscripcion);

            if(listaInscripcionActualizada){
                util.setSuccess(200,'Lista inscripción actualizada',listaInscripcionActualizada);
            }
            else{
                util.setError(404,`ListaInscripcion no encontrada `);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
    
    static async eliminarListaInscripcion(req, res){
        try {
            const id_lista = req.params.id;
            const listaEliminada= await ListaInscripcionService.eliminarListaInscripcion(id_lista);

            if(listaEliminada) {
                util.setSuccess(200,'ListaInscripcion eliminada');
            }
            else{
                util.setError(404,`ListaInscripcion no se pudo eliminar`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerCapitan(lista){
        try {
            const capitan =  await lista.getCapitan();
            return capitan.dataValues;
        } 
        catch (error) {
            throw error;
        }
    }
    static async obtenerDelegado(lista){
        try {
            const delegado = await lista.getDelegado();
            return delegado.dataValues;
        } 
        catch (error) {
            throw error;
        }
    }
    static async obtenerSubDelegado(lista){
        try {
            const subdelegado =  await lista.getSubDelegado();
            return subdelegado.dataValues;
        } 
        catch (error) {
            throw error;
        }
    }

    static async obtenerTorneo(anio_torneo, tipo_torneo){
        try {
            const torneo =  await ListaInscripcionService.obtenerTorneo(anio_torneo,tipo_torneo);
            return torneo;
        } 
        catch (error) {
            throw error;
        }
    }

    static async obtenerJugadores(req,res){
        const id_lista = req.params.id;

        try {
            const jugadores = await ListaInscripcionService.obtenerJugadores(id_lista);
            if(jugadores){
                util.setSuccess(200,`Jugadores de la lista: ${id_lista}  obtenidos`,jugadores);
            }
            else{
                util.setError(404,`Jugadores no encontrados`);
            }
            return util.send(res);

        } catch (error) {
            throw error;
        }
    }
}

export default ListaInscripcionController;
