import Categoria_contiene_Equipo from '../models/Categoria_contiene_Equipo';
import CategoriaService from './CategoriaService';


class Categoria_contiene_EquipoService {
  
  /* function agregarEquipos2(id_categoria,equipos) {
    return Promise.all(equipos.map(async (equipo) => {
        let id_equipo = equipo.id_equipo;

        await Categoria_contiene_Equipo.create({id_equipo:id_equipo,id_categoria:id_categoria});
    }));
}

function createObjects(id_categoria,equipos) {
    return Promise.all(
        equipos.map(({ Categoria_contiene_Equipo }) => agregarEquipos2(id_categoria,equipos))
    );
} */



    static async agregarEquipos(id_categoria,equipos) {    
     // console.log("EL json completo",jugadores.jugadores);
      var lista = equipos.equipos;
      try {
        for (var i in lista){
          const equipo = lista[i];
          const id_equipo = equipo.id_equipo;
          await Categoria_contiene_Equipo.create({id_equipo:id_equipo,id_categoria:id_categoria});
        }
      } 
      catch (error) {
        throw error;
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
    /*
    static async actualizarJugador(dni,jugador){
      try {
        const jugadorExistente = await Jugador.findByPk(dni);

        if(jugadorExistente){
          await Jugador.update(jugador,{where:{dni:dni}});
          return jugador; 
        }
        else{
          return null;
        }
      }
       catch (error) {
         throw error;
        }
      }
      
    static async eliminarJugador(dni){
      try {
        const jugadorExistente = await Jugador.findByPk(dni);

        if(jugadorExistente){
          const jugadorEliminado = await Jugador.destroy({where:{dni:dni}});
          return jugadorEliminado; 
        }
        else{
          return null;
        }
      }
      catch (error) {
        throw error;
      }
    } */
} 
  
  export default Categoria_contiene_EquipoService;

