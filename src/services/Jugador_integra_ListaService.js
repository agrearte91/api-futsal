import Jugador from '../models/Jugador';
import Jugador_integra_Lista from '../models/Jugador_integra_Lista';
import ListaInscripcion from '../models/ListaInscripcion';

class Jugador_integra_ListaService {  
    static async agregarJugadoresEnLista(id_lista,jugadores) {    
     // console.log("EL json completo",jugadores.jugadores);
      var lista = jugadores.jugadores;

      try {
        for (var i in lista){
          const jugador = lista[i];
          const dni = jugador.dni;
          await Jugador_integra_Lista.create({dni_jugador:dni,id_lista:id_lista});
        }
      } 
      catch (error) {
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

