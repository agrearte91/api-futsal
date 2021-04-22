import Jugador from '../models/Jugador';
import Jugador_integra_Lista from '../models/Jugador_integra_Lista';
import ListaInscripcion from '../models/ListaInscripcion';

class Jugador_integra_ListaService {  
    static async agregarJugadoresEnLista(id_lista,jugadores) {    //recibe una lista de jugadores 
      const jugadores_lista = [];
     for (var i in jugadores){
       const jugador = jugadores[i];
       const dni = jugador.dni_jugador;
       jugadores_lista.push({dni_jugador:dni,id_lista:id_lista}); //creamos las tuplas (dni_jugador, id_lista);
      }

    try{
      const operacion = await Jugador_integra_Lista.bulkCreate(jugadores_lista,{returning:true});
      //anduvo ok! el tema es si las tuplas la armo de este lado o tiene que venir así del front-end
      return operacion;
    }
    catch (error){
      throw new Error(error.message + error.parent.detail);
    }
  }

  static async eliminarJugadorEnLista(id_lista, dni_jugador){
    try {
      const jugadorEliminado = await Jugador_integra_Lista.destroy({where:{id_lista:id_lista,dni_jugador:dni_jugador}});
      if(jugadorEliminado){
        return jugadorEliminado;
      }
      else{
        return null;
      }
    } catch (error) {
      throw error;
    }
  }




  

/*    static async obtenerJugador(dni){
      try {
        const jugador = await Jugador.findByPk(dni);
        return jugador; 
      }
       catch (error) {
         throw error;
        }
      }
    
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
  
  export default Jugador_integra_ListaService;

