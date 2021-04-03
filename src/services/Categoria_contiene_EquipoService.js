import Categoria_contiene_Equipo from '../models/Categoria_contiene_Equipo';
import CategoriaService from './CategoriaService';


class Categoria_contiene_EquipoService {
  static async agregarEquipos(id_categoria,equipos) {    
    var tuplas = [];
    
    for (var i in equipos){
      const equipo = equipos[i];
      const id_equipo = equipo.id_equipo;
      const categ_equipo = {"id_equipo":id_equipo,"id_categoria":id_categoria}; //creamos las tuplas..
      tuplas.push(categ_equipo);
    }
    
    try{
      return await Categoria_contiene_Equipo.bulkCreate(tuplas,{returning:true}); //... para insertarlas con método bulkCreate (todas o ninguna)
    }
    catch (error) {
      throw new Error (error.parent.detail); //detecta el objeto que provocó el error, no se inserta ninguno de los objetos.
    }
  }
  
  static async obtenerEquipos(id_categoria){
    try {
      const equipos = await Categoria_contiene_Equipo.findAll({raw:true,where:{id_categoria:id_categoria}});
      return equipos;
    }
    catch (error) {
      throw error;
    }
  }
  
  static async eliminarEquipo(id_equipo,id_categoria){
      try {
        const equipoEnCategoria = await Categoria_contiene_Equipo.findOne({where:{id_equipo:id_equipo,id_categoria:id_categoria}});

        if(equipoEnCategoria){
          const equipoEliminado = await Categoria_contiene_Equipo.destroy({where:{id_equipo:id_equipo,id_categoria:id_categoria}});
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
  
  export default Categoria_contiene_EquipoService;

