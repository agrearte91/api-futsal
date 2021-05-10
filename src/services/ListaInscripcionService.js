import ListaInscripcion from '../models/ListaInscripcion';

import Torneo from '../models/Torneo';
import Jugador_integra_Lista from '../models/Jugador_integra_Lista';

class ListaInscripcionService { 
    static async agregarListaInscripcion(nuevaListaInscripcion) {
      try {
        return await ListaInscripcion.create(nuevaListaInscripcion);
      } catch (error) {
        throw error;
      }
    }

    static async obtenerListasInscripcion(){
      try {
        return await ListaInscripcion.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }


    static async obtenerListaInscripcion(id_lista){
      try {
        const lista = await ListaInscripcion.findByPk(id_lista);
        return lista;
      } 
      catch (error) {
        throw error;   
      }
    }

    static async actualizarListaInscripcion(id_lista,lista){
      try {
        const listaExistente = await ListaInscripcion.findByPk(id_lista);

        if(listaExistente){
          await ListaInscripcion.update(lista,{where:{id_lista:id_lista}});
          return lista; 
        }
        else{
          return null;
        }
      }
       catch (error) {
         throw error;
        }
      }

      static async eliminarListaInscripcion(id_lista){
        try {
          const listaExistente = await ListaInscripcion.findByPk(id_lista);
          if(listaExistente){
            await Jugador_integra_Lista.destroy({where:{id_lista:id_lista}}); //eliminamos la lista de jugadores
            const listaEliminada = await ListaInscripcion.destroy({where:{id_lista:id_lista}});
            return listaEliminada; 
          }
          else{
            return null;
          }
        }
        catch (error) {
          throw error;
        }
      }

      static async obtenerTorneo(anio_torneo,tipo_torneo){
        try {
          const torneo = await Torneo.findOne({where:{anio:anio_torneo,tipo:tipo_torneo}});
          return torneo.dataValues;
        } 
        catch (error) {
          throw error;   
        }
      }

      static async obtenerJugadores(id_lista){
        try {
          const lista = await ListaInscripcion.findByPk(id_lista);
          
          if (lista){
            const jugadores = await Jugador_integra_Lista.findAll({raw:true,where:{id_lista:id_lista}});
            return jugadores;
          }
        } 
        catch (error) {
          throw error;
        }
      }

} 

  export default ListaInscripcionService;

