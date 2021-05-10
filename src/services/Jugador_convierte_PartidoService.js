import Jugador_convierte_Partido from '../models/Jugador_convierte_Partido';

class Jugador_convierte_PartidoService {  

    static async agregarTupla(jugador_goles) { 
      try {
        return await Jugador_convierte_Partido.create(jugador_goles);
      } 
      catch (error) {
        throw error;
      }
    }
    
    static async agregarTuplas(tuplas_jugador_goles){
      try{
        return  await Jugador_convierte_Partido.bulkCreate(tuplas_jugador_goles,{returning:true});
      } catch (error) { 
        throw new Error (error.parent.detail); //el objeto que provocó el error. No se inserta ningún objeto.
      }
    }

    static async obtenerTupla(dni_jugador,id_partido){
      try {
        const tupla = await Jugador_convierte_Partido.findOne({where:{dni_jugador:dni_jugador, id_partido:id_partido}});
        return tupla;
      }
       catch (error) {
         throw error;
        }
      }

    static async obtenerTuplas(){
      try {
        return await Jugador_convierte_Partido.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }

} 

export default Jugador_convierte_PartidoService;

