import Tabla from '../models/Tabla';

class TablaService {  
    static async agregarTabla(nuevaTabla) {
      try {
        return await Tabla.create(nuevaTabla);
      } catch (error) {
        throw error;
      }
    }

    static async crearTablaVacia(){
      try {
        const tabla={};
        tabla.tabla = {};
        return await Tabla.create();
      } catch (error) {
        throw error;
      }
    }

    static async obtenerTablas(){
      try {
        return await Tabla.findAll();
      }
      catch (error) {
        throw error;
      }
    }

    static async obtenerTabla(id_tabla){
      try {
        const tabla = await Tabla.findByPk(id_tabla);
        return tabla;
      }
      catch (error) {
        throw error;
      }
    }

    static async resetearTabla(id_tabla){
      try {
        const tabla_inicial =  this.actualizarTabla(id_tabla,{"tabla":null});

        return tabla_inicial;
      }
      catch (error) {
        throw error;
      }
    }

    static async eliminarTabla(id_tabla){
      try {
        const tablaExistente = await Tabla.findByPk(id_tabla);
        if(tablaExistente){
          const tablaEliminada = await Tabla.destroy({where:{id_tabla:id_tabla}});
          return tablaEliminada;
        }
        else{
          return null;
        }
      }
      catch (error) {
        throw error;
      }
    }

    static async actualizarTabla(id_tabla,tabla){
      try {
        const tablaExistente = await Tabla.findByPk(id_tabla);
        if(tablaExistente){
          const actualizado = await Tabla.update(tabla,{where:{id_tabla:id_tabla}});
          if(actualizado==0){ //si no hay columnas afectadas
            return 0;
          }
          else{
            return tabla;
          }
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

  export default TablaService;

