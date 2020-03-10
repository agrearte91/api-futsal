import Jugador from '../models/Jugador';

class JugadorService {  
    static async agregarJugador(nuevoJugador) {
      try {
        return await Jugador.create(nuevoJugador);
      } 
      catch (error) {
        throw error;
      }
    }

    static async obtenerJugadores(){
      try {
        return await Jugador.findAll({
          attributes:['dni','legajo','facultad']}
        );
      } 
      catch (error) {
        throw error;   
      }
    }

    static async obtenerJugador(dni){
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
    }
} 
  
  export default JugadorService;

