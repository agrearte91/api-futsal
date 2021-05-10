import Jugador_integra_Lista from '../models/Jugador_integra_Lista';

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

} 
  
  export default Jugador_integra_ListaService;

