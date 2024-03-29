import CategoriaService from '../services/CategoriaService';
import Util from '../utils/Utils';
import Categoria_contiene_EquipoService from '../services/Categoria_contiene_EquipoService';
import TablaService from '../services/TablaService';
import PartidoService from '../services/PartidoService';


const util = new Util();

class CategoriaController {
    static async crearCategoria(req, res) {    
        try {    
            const nuevaCategoria = req.body;
            const nuevaTabla = await TablaService.crearTablaVacia();  //creamos una tabla inicial para la nueva categoria
            nuevaCategoria.id_tabla = nuevaTabla.id_tabla;
            
            const categoriaCreada = await CategoriaService.agregarCategoria(nuevaCategoria);

            util.setSuccess(201,'Categoria añadida',categoriaCreada);
            return util.send(res);
        }
        catch (error){
            util.setError(400,error.message);
            return util.send(res);
        }
    }

    static async obtenerCategoriaDelTorneo(req,res) {
        try {
            const nombre_categoria = req.params.nombre;
            const anio_torneo = req.params.anio;
            const tipo_torneo = req.params.tipo;

            const categoria = await CategoriaService.obtenerCategoriaDelTorneo(nombre_categoria,anio_torneo,tipo_torneo);
            
            if(categoria){
                util.setSuccess(200,'Categoria obtenida',categoria);
            }
            else{
                util.setSuccess(200,'No se encuentra la Categoría'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerCategoriasDelTorneo(req,res) {
        try {
            const anio_torneo = req.params.anio;
            const tipo_torneo = req.params.tipo;

            const categorias = await CategoriaService.obtenerCategoriasDelTorneo(anio_torneo,tipo_torneo);
            
            if(categorias){
                util.setSuccess(200,'Categorias obtenida',categorias);
            }
            else{
                util.setSuccess(200,'No se encuentran las Categorías'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }


    static async obtenerCategorias(req, res){
        try {
            const categorias = await CategoriaService.obtenerCategorias();
            
            if(categorias && categorias.length > 0){
                util.setSuccess(200,'Categorias obtenidas',categorias);
            }
            else{
                util.setSuccess(200,'No se encuentran Categorías'); 
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(400,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerCategoria(req, res){
        try {
            const id_categoria = req.params.id;
            const categoria = await CategoriaService.obtenerCategoria(id_categoria);
            if(categoria){
                //const goleadores = await CategoriaService.computarTablaGoleadores(id_categoria);
                // util.setSuccess(200,'Categoria obtenida',goleadores);
                util.setSuccess(200,'Categoria obtenida',categoria);
            }
            else{
                util.setError(200,`Categoria no encontrada`);
            }
            return util.send(res);
        }
        catch (error) {
            util.setError(404,error.message);
            return util.send(res);   
        }
    }
   
    static async actualizarCategoria(req, res){
        try {
            const id_categoria = req.params.id;
            const categoria = req.body;
            const categoriaActualizada = await CategoriaService.actualizarCategoria(id_categoria,categoria);

            if(categoriaActualizada==0){
                util.setError(400,`Categoría con id:"${id_categoria}" no se pudo actualizar. Chequear parámetros`);
            }
            else{
                if(categoriaActualizada==null){
                    util.setError(200,`Categoria con id:"${id_categoria}" no encontrada`);
                }
                else{
                    util.setSuccess(200,'Categoría actualizada',categoriaActualizada);
                }
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);
            return util.send(res);
        }
    }

    static async eliminarCategoria(req, res){
        try {
            const id_categoria = req.params.id;
            const categoriaEliminada = await CategoriaService.eliminarCategoria(id_categoria);

            if(categoriaEliminada){
                util.setSuccess(200,'Categoria eliminada');
            }
            else{
                util.setSuccess(200,`Categoria con id: ${id_categoria} no encontrada`);
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
            const id_categoria = req.params.id;
            const id_equipo = req.params.id_equipo;
            
            const equipoEliminado = await Categoria_contiene_EquipoService.eliminarEquipo(id_equipo,id_categoria);

            if(equipoEliminado){
                util.setSuccess(200,`Equipo con id: ${id_equipo} eliminado de la categoría ${id_categoria}`);
            }
            else{
                util.setError(404,`Equipo con id: ${id_equipo} o categoría con id: ${id_categoria} no encontrados`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async agregarEquipos(req, res){
        try {
            const id_categoria = req.params.id;
            const categoria = await CategoriaService.obtenerCategoria(id_categoria);
            const equipos = req.body;

            if(categoria){
                const equiposAgregados = await Categoria_contiene_EquipoService.agregarEquipos(id_categoria,equipos); 
                if (equiposAgregados){
                    util.setSuccess(200,`Equipos agregados a la categoria ${id_categoria} `,equipos);
                }
                else{
                    util.setSuccess(200,`No se pudieron agregar equipos a la categoría ${id_categoria} `,equipos);
                }               
            }
            else{
                util.setError(200,`Categoria con id: ${id_categoria} no encontrada`);
            } 

            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerEquipos(req, res){
        try {
            const id_categoria = req.params.id;
            const categoria = await CategoriaService.obtenerCategoria(id_categoria);

            if(categoria){
                const equipos = await Categoria_contiene_EquipoService.obtenerEquipos(id_categoria);
                util.setSuccess(200,`Equipos de la categoria ${id_categoria} `,equipos);
            }
            else{
                util.setError(404,`Categoria con id: ${id_categoria} no encontrada`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerPartidos(req,res){
        try {
            const id_categoria = req.params.id;
            const partidos = await CategoriaService.obtenerPartidos(id_categoria);

            if(partidos){
                if (partidos.length==0){
                    util.setSuccess(200,`No se registraron partidos en la categoria con id: ${id_categoria}`,partidos);
                }
                else{
                    util.setSuccess(200,`Partidos de la categoria ${id_categoria} `, partidos);
                }
            }
            else{
                util.setSuccess(200,`Partidos de la Categoria con id: ${id_categoria} no encontrados`);
            } 
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async obtenerTabla(req,res){
        try {
            const id_categoria = req.params.id;
            const tabla = await CategoriaService.obtenerTabla(id_categoria);

            if(tabla){
                util.setSuccess(200,`Tabla de la categoria ${id_categoria}`,tabla);
            }
            else{
                util.setError(404,`Tabla de la Categoria id: ${id_categoria} no encontrada`);
            }
            return util.send(res);
        } 
        catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        } 
    }

    static async obtenerTorneo(id_categoria){
        const torneo = await CategoriaService.obtenerTorneo(id_categoria);
        return torneo; 
    }

    static async goleadores(req,res){
        try {
            const id_categoria = req.params.id;
            const goleadores = await CategoriaService.goleadores(id_categoria);
            
            if (goleadores!=null){
                util.setSuccess(200,`Goleadores calculados con éxito`, goleadores);
            }
            else{
                util.setError(404,`Goleadores no se pudieron calcular`);
            }
            return util.send(res);

        } catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async refrescarTabla(req,res){
        try {
            const id_categoria = req.params.id;
            const tablaActualizada = await CategoriaService.refrescarTabla(id_categoria);
            

            if (tablaActualizada!=null){
                util.setSuccess(200,`Tabla actualizada con éxito`, tablaActualizada);
            }
            else{
                util.setError(404,`Tabla no se pudo actualizar`);
            }
            return util.send(res);

        } catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async computarPartido(req, res){
        try {
            const id_categoria = req.params.id_categoria;
            const id_partido = req.params.id_partido;

            const partido = await PartidoService.obtenerPartido(id_partido);
            const tabla = await CategoriaService.obtenerTabla(id_categoria);

            const tablaActualizada = await CategoriaService.computarPartido(tabla,partido);

            const tablaActualizada2 = await TablaService.actualizarTabla(tabla.id_tabla,tablaActualizada);

             if(tablaActualizada2){
                util.setSuccess(200,`Partido computado con éxito`, tablaActualizada2);
            } 
            
            return util.send(res);

        } catch (error) {
            util.setError(404,error.message);   
            return util.send(res);   
        }
    }

    static async actualizarPartidos(req, res){
        try {
            const partidos = req.body;

            const cargaPartidos = await PartidoService.actualizarPartidos(partidos); 

            if(cargaPartidos==0){
                util.setError(400,`Partidos no se pudieron actualizar. Chequear parámetros`);
            }
            else{
                if (cargaPartidos!=null){
                    util.setSuccess(200,`Partidos de la categoría actualizados con éxito`,cargaPartidos);
                }
                else{
                    util.setError(404,`Partidos de la categoría no se pudieron actualizar`);
                }
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error.message);
            return util.send(res);
        }
    }
}

export default CategoriaController;
