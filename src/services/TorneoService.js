import Torneo from '../models/Torneo';
import Categoria from '../models/Categoria';
import ListaInscripcion from '../models/ListaInscripcion';

class TorneoService {  
    static async agregarTorneo(nuevoTorneo) {
      try {
        return await Torneo.create(nuevoTorneo);
      } catch (error) {
        throw error;
      }
    }

    static async obtenerTorneos(){
      try {
        return await Torneo.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }

    static async obtenerTorneo(anio,tipo){
      try {
        const torneo = await Torneo.findOne({where:{anio:anio,tipo:tipo}});

        TorneoService.obtenerCategorias(anio,tipo);        
        return torneo;
      }
       catch (error) {
         throw error;
        }
      }

    static async obtenerCategorias(anio, tipo){
      try {
        const categorias = await Categoria.findAll({raw: true,where:{anio_torneo:anio,tipo_torneo:tipo}});
        //console.log("Categorias asociadas al torneo",anio,tipo," son ",categorias); 

      } catch (error) {
        throw error;
      }
    }

    static async obtenerListas(anio_torneo, tipo_torneo){
      try {
        const listas = await ListaInscripcion.findAll({raw: true,where:{anio_torneo:anio_torneo,tipo_torneo:tipo_torneo}});
        //console.log("Listas asociadas al torneo",anio_torneo,tipo_torneo," son ",listas); 
        return listas;
      } catch (error) {
        throw error;
      }
    }

    static async eliminarTorneo(anio,tipo){
      try {
        const torneoExistente = await Torneo.findOne({where:{anio:anio,tipo:tipo}});
        if(torneoExistente){
          const torneoEliminado = await Torneo.destroy({where:{anio:anio,tipo:tipo}});
          return torneoEliminado; 
        }
        else{
          return null;
        }
      }
      catch (error) {
        throw error;
      }
    }

    static async actualizarTorneo(anio,tipo,torneo){
      try {
        const torneoExistente = await Torneo.findOne({where:{anio:anio,tipo:tipo}});

        if(torneoExistente){
          await Torneo.update(torneo,{where:{anio:anio,tipo:tipo}});
          return torneo; 
        }
        else{
          return null;
        }
      }
       catch (error) {
         throw error;
        }
      }
} 

  export default TorneoService;

