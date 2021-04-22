import Equipo from '../models/Equipo';

class EquipoService { 
    static async agregarEquipo(nuevoEquipo) {
      try {
        return await Equipo.create(nuevoEquipo);
      } catch (error) {
        throw error;
      }
    }

    static async agregarEquipos(nuevosEquipos){
      try{
        return  await Equipo.bulkCreate(nuevosEquipos,{returning:true});
      } catch (error) { 
        throw new Error (error.parent.detail); //el objeto que provocó el error. No se inserta ningún objeto.
      }
  }

    static async obtenerEquipos(){
      try {
        return await Equipo.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }

    static async obtenerEquipo(nombre){
      try {
        const equipo = await Equipo.findOne({where:{nombre:nombre}});
        return equipo;
      }
       catch (error) {
         throw error;
        }
      }

      static async obtenerEquipoID(id){
        try {
          const equipo = await Equipo.findByPk(id);
          return equipo;
        }
         catch (error) {
           throw error;
          }
        }

    static async actualizarEquipo(id_equipo,equipo){
      try {
        const equipoExistente = await Equipo.findByPk(id_equipo);

        if(equipoExistente){
          await Equipo.update(equipo,{where:{id_equipo:id_equipo}});
          return equipo; 
        }
        else{
          return null;
        }
      }
       catch (error) {
         throw error;
        }
      }
      
    static async eliminarEquipo(id_equipo){
      try {
        const equipoExistente = await Equipo.findByPk(id_equipo);

        if(equipoExistente){
          const equipoEliminado = await Equipo.destroy({where:{id_equipo:id_equipo}});
          return equipoEliminado; 
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

  export default EquipoService;

