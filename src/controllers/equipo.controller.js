import EquipoService from '../services/EquipoService';
import Util from '../utils/Utils';

const util = new Util();

class EquipoController {
    static async crearEquipo(req, res) {    
        try {    
            const nuevoEquipo = req.body;
            const EquipoCreada = await EquipoService.agregarEquipo(nuevoEquipo);

            util.setSuccess(201,'Equipo añadido',EquipoCreada);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async crearEquipos(req, res) {    
        //Recibe un arreglo objetos Equipo para ser creados, se insertan todos (si no hay error), o ninguno (si hay error)
        try {    
            const nuevosEquipos = req.body;
            const equiposCreados = await EquipoService.agregarEquipos(nuevosEquipos);
            util.setSuccess(201,'Equipos añadidos',equiposCreados);
            return util.send(res);
        }
        catch (error){
            util.setError(400,"No se añadieron los equipos: "+error.message);
            return util.send(res);
        }
    }

    static async obtenerEquipos(req, res){
        try {
            const Equipos = await EquipoService.obtenerEquipos();
            
            if(Equipos && Equipos.length > 0){
                util.setSuccess(200,'Equipos obtenidos',Equipos);
            }
            else{
                util.setSuccess(200,'No se encuentran Equipos'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerEquipo(req, res){
        try {
            var equipo;

            if(req.params.id){
                const id = req.params.id;
                equipo = await EquipoService.obtenerEquipoID(id);
            }
            else{
                const nombre = req.params.nombre;
                equipo = await EquipoService.obtenerEquipo(nombre);
            }
            
            if(equipo){
                util.setSuccess(200,'Equipo obtenido',equipo);
            }
            else{
                util.setError(404,`Equipo no encontrado`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
  
    static async actualizarEquipo(req, res){

        try {
            const id_equipo = req.params.id;

            const equipo = req.body;

            const equipoActualizado = await EquipoService.actualizarEquipo(id_equipo,equipo);

            if(equipoActualizado){
                util.setSuccess(200,'Categoría actualizada',equipoActualizado);
            }
            else{
                util.setError(404,`Equipo no encontrado`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async eliminarEquipo(req, res){
        try {
            const id_equipo = req.params.id;
            const equipoEliminado = await EquipoService.eliminarEquipo(id_equipo);

            if(equipoEliminado){
                util.setSuccess(200,'Equuipo eliminado');
            }
            else{
                util.setError(404,`Equipo con id_equipo: ${id_equipo} no encontrado `);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }
} 

export default EquipoController;
