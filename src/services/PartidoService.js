import Partido from '../models/Partido';


class PartidoService { 
    static async agregarPartido(nuevoPartido) {
      try {
        return await Partido.create(nuevoPartido);
      } catch (error) {
        throw error;
      }
    }

    static async obtenerPartidos(){
      try {
        return await Partido.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }
    
    static async obtenerPartido(id_partido){
      try {
        const partido = await Partido.findByPk(id_partido);

        return partido.dataValues;
      }
       catch (error) {
         throw error;
        }
      }

    static async actualizarPartido(id_partido,partido){
      try {
        const partidoExistente = await Partido.findByPk(id_partido);

        if(partidoExistente){
          const actualizado = await Partido.update(partido,{where:{id_partido:id_partido}});

          if(actualizado==0){ //si no hay columnas afectadas
            return 0;
          }
          else{
            return partido; 
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

      static async eliminarPartido(id_partido){
        try {
          const partidoExistente = await Partido.findByPk(id_partido);
  
          if(partidoExistente){
            const partidoEliminado = await Partido.destroy({where:{id_partido:id_partido}});
            return partidoEliminado; 
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

  export default PartidoService;

