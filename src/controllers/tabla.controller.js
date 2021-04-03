import TablaService from '../services/TablaService';
import Util from '../utils/Utils';

const util = new Util();

class TablaController {
    static async crearTabla(req, res) {    
        try {    
            const nuevaTabla = req.body;
            const TablaCreada = await TablaService.agregarTabla(nuevaTabla);

            util.setSuccess(201,'Tabla añadida', TablaCreada);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async obtenerTablas(req, res){
        try {
            const tablas = await TablaService.obtenerTablas();
        
            if(tablas && tablas.length > 0){
                util.setSuccess(200,'Tablas obtenidas',tablas);
            }
            else{
                util.setSuccess(200,'No se encuentran Tablas'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerTabla(req, res){
        try {
            const id_tabla = req.params.id;
            const tabla = await TablaService.obtenerTabla(id_tabla);
            
            if(tabla){
                util.setSuccess(200,'Tabla obtenida',tabla);
            }
            else{
                util.setError(404,`Tabla con id:"${id_tabla}" no encontrado`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async resetearTabla(req, res) {    
        try {    
            const id_tabla = req.params.id;
            const tablaCreada = await TablaService.resetearTabla(id_tabla);

            util.setSuccess(201,'Tabla reestablecida', tablaCreada);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async eliminarTabla(req, res){
        try {
            const id_tabla = req.params.id;
            const tablaEliminada = await TablaService.eliminarTabla(id_tabla);

            if(tablaEliminada){
                util.setSuccess(200,'Tabla eliminada');
            }
            else{
                util.setError(404,`Tabla con id:"${id_tabla}" no encontrada`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    } 

    static async actualizarTabla(req, res){
        try {
            const id_tabla = req.params.id;
            const tabla = req.body;

            const tablaActualizada = await TablaService.actualizarTabla(id_tabla,tabla);

            if(tablaActualizada==0){ // no hay columnas actualizadas
                util.setError(400,`Tabla con id:"${id_tabla}" no se pudo actualizar. Chequear parámetros`);
            }
            else{
                if(tablaActualizada==null){
                    util.setError(404,`Tabla con id:"${id_tabla}" no se encuentra`);
                }
                else{
                    util.setSuccess(200,'Tabla actualizada',tablaActualizada);
                }
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);
            return util.send(res);
        }
    } 
}

export default TablaController;
