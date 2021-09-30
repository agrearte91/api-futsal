import Partido from '../models/Partido';

class PartidoService { 
    static async agregarPartido(nuevoPartido) {
      try {
        return await Partido.create(nuevoPartido);
      } catch (error) {
        throw error;
      }
    }

    static async agregarPartidos(nuevosPartidos){
      try{
        return await Partido.bulkCreate(nuevosPartidos,{returning:true});
      } catch (error) { 
        throw new Error (error.parent.detail); //el objeto que provocó el error. No se inserta ningún objeto.
      }
  }

    static async obtenerPartidos(){
      try {
        return await Partido.findAll();
        //return await Partido.consulta(14);
      } 
      catch (error) {
        throw error;   
      }
    }
    
    static async obtenerPartido(id_partido){
      try {
        const partidoExistente = await Partido.findByPk(id_partido);
        if (partidoExistente){
          return partido.dataValues;
        }
        else{
          return null;
        }
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

      static async actualizarPartidos(partidos){
        try {
            if(partidos!=null & partidos.length!=0){

              const partidos_actualizados = await Partido.bulkCreate(partidos,{updateOnDuplicate: ["goles_local","goles_visitante",
            "jugado","dni_arbitro","dni_asistente","fecha","hora"],returning:true}); //los campos que se actualizarán (solamente)
  
            if(partidos_actualizados==0){ //si no hay columnas afectadas
              return 0;
            }
            else{
              return partidos_actualizados; 
            }
          }
          else{
            return 0;
          }
            
        }
         catch (error) {
           throw new Error (error.parent.detail);
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

