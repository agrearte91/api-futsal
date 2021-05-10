import Categoria from '../models/Categoria';
import Torneo from '../models/Torneo';
import Partido from '../models/Partido';
import Jugador_convierte_Partido from '../models/Jugador_convierte_Partido';

import Categoria_contiene_EquipoService from './Categoria_contiene_EquipoService';
import EquipoService from './EquipoService';
import TablaService from './TablaService';

class CategoriaService { 
    static async agregarCategoria(nuevaCategoria) {
      try {
        return await Categoria.create(nuevaCategoria);
      } catch (error) {
        throw error;
      }
    }

    static async obtenerCategorias(){
      try {
        return await Categoria.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }
    
    static async obtenerCategoria(id_categoria){
      try {
        const categoria = await Categoria.findByPk(id_categoria);
        
        if(categoria==null){
          return null;
        }
        return categoria.dataValues;
      }
      catch (error) {
        throw error;
      }
    }

    static async obtenerCategoriaDelTorneo(nombre_categoria, anio_torneo, tipo_torneo){
      try {
        const anio_torneo2 = parseInt(anio_torneo);
        const categoria = await Categoria.findOne({where:{nombre:nombre_categoria,anio_torneo:anio_torneo2,tipo_torneo:tipo_torneo}});
        if(categoria==null){
          return null;
        }
        return categoria.dataValues;
      }
      catch (error) {
        throw error;
      }
    }

    static async actualizarCategoria(id_categoria,categoria){
      try {
        const categoriaExistente = await Categoria.findByPk(id_categoria);

        if(categoriaExistente){
          const actualizado = await Categoria.update(categoria,{where:{id_categoria:id_categoria}});

          if(actualizado==0){ //si no hay columnas afectadas
            return 0;
          }
          else{
            return categoria; 
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

      static async eliminarCategoria(id_categoria){
        try {
          const categoriaExistente = await Categoria.findByPk(id_categoria);
  
          if(categoriaExistente){
            const categoriaEliminada = await Categoria.destroy({where:{id_categoria:id_categoria}});
            return categoriaEliminada; 
          }
          else{
            return null;
          }
        }
        catch (error) {
          throw error;
        }
      }

      static async obtenerTabla(id_categoria){
        try {
          const categoria = await Categoria.findByPk(id_categoria);
          
          if(categoria){
            const tabla = await categoria.getTabla();
            return tabla.dataValues;
          }
          else{
            return null;
          }
        } 
        catch (error) {
          throw error;
        }
      }

      static async obtenerTorneo(id_categoria){
        try {
          
          const categoria = await Categoria.findByPk(id_categoria);
          const anio_torneo = await categoria.anio_torneo;
          const tipo_torneo = await categoria.tipo_torneo;
          
          const torneo = await Torneo.findOne({raw: true,where:{anio:anio_torneo,tipo:tipo_torneo}});

          return torneo;
        } 
        catch (error) {
          throw error;
        }
      }
      
      static async obtenerPartidos(id_categoria){
        try {
          const partidos = await Partido.findAll({raw: true,where:{id_categoria:id_categoria}});
          return partidos;
        } 
        catch (error) {
          throw error;
        }
      }

      static async generarTablaInicial(id_categoria){
        try {
          const equipos = await Categoria_contiene_EquipoService.obtenerEquipos(id_categoria);
          const tabla = [];

          if (equipos){

            for (var i in equipos){
              const equipo_categoria = equipos[i];  //tupla (id_equipo, id_categoria)
              const id_equipo =  equipo_categoria.id_equipo;
              const equipo = await EquipoService.obtenerEquipoID(id_equipo);
              
              var fila = {
                "id_equipo": equipo.id_equipo,
                "nombre_equipo": equipo.nombre,
                "puntos": 0,  
                "partidos_jugados": 0,
                "partidos_ganados": 0,
                "partidos_empatados": 0,
                "partidos_perdidos": 0,
                "goles_favor": 0,
                "goles_contra": 0,
                "diferencia_goles": 0
              };

              tabla.push(fila);
            }

            var tabla_json = {};
            tabla_json.tabla = tabla;

            //const categoria = await CategoriaService.obtenerCategoria(id_categoria);
            
            //const tablaActualizada = await TablaService.actualizarTabla(categoria.id_tabla,tabla); 

            return tabla_json;
          }
          else{
            return null;
          }

        } catch (error) {
           throw error;
        }
      }

      static async computarPartido(tabla,partido){
        try {

          const id_equipo_local = partido.id_equipo_local;
          const id_equipo_visitante = partido.id_equipo_visitante;
          
          var goles_local = partido.goles_local;
          var goles_visitante = partido.goles_visitante;

          var tablaPuntaje = tabla.tabla;
          
          var fila_equipo_local = tablaPuntaje.filter(function (fila) {
            return fila.id_equipo == id_equipo_local;
          });

          var fila_equipo_visitante = tablaPuntaje.filter(function(fila){
            return fila.id_equipo == id_equipo_visitante;
          });

          if(goles_local>goles_visitante){
            CategoriaService.computarVictoria(fila_equipo_local,fila_equipo_visitante);
          }
          else{
            if(goles_local<goles_visitante){
              CategoriaService.computarVictoria(fila_equipo_visitante,fila_equipo_local);
            }
            else{
              CategoriaService.computarEmpate(fila_equipo_local,fila_equipo_visitante);
            }
          }

          CategoriaService.computarJugado_Goles(fila_equipo_local,goles_local,goles_visitante);
          CategoriaService.computarJugado_Goles(fila_equipo_visitante,goles_visitante,goles_local);
          
          return tabla;
        }
        catch (error) {
          throw error;
        }
      }


      static async computarVictoria(equipo1,equipo2){
        //Victoria del equipo1 sobre el equipo2
        equipo1[0].puntos += 3;
        equipo1[0].partidos_ganados +=1;
        equipo2[0].partidos_perdidos +=1;
      }

      static async computarEmpate(equipo1,equipo2){
        equipo1[0].puntos += 1;
        equipo2[0].puntos+=1;
        equipo1[0].partidos_empatados+=1;
        equipo2[0].partidos_empatados +=1;
      }

      static async computarJugado_Goles(equipo,golesFavor,golesContra){
        equipo[0].partidos_jugados+=1;
        equipo[0].goles_favor += golesFavor;
        equipo[0].goles_contra += golesContra;
        equipo[0].diferencia_goles = (equipo[0].goles_favor - equipo[0].goles_contra);
      }

      static async computarPartidosJugados(id_categoria,tabla_inicial){

        const partidos = await CategoriaService.obtenerPartidos(id_categoria);
        var tabla_computada = tabla_inicial;

        var partidos_jugados = partidos.filter(function (partido) {
          return partido.jugado == true; 
        }); //obtenemos todos los partidos jugados hasta el momento en la categoría

        for (var i in partidos_jugados){
          var partidoJugado = partidos_jugados[i];
          tabla_computada = await CategoriaService.computarPartido(tabla_computada,partidoJugado);
        }

        return tabla_computada;
      } 

      static async refrescarTabla(id_categoria){
        
      try {
        const tabla_inicial = await this.generarTablaInicial(id_categoria);  // {"tabla": { ...., .... }} 
        const tabla_calculada = await this.computarPartidosJugados(id_categoria,tabla_inicial);

        const categoria = await CategoriaService.obtenerTabla(id_categoria);
        const id_tabla = categoria.id_tabla;
        const actualizacion_tabla = await TablaService.actualizarTabla(id_tabla,tabla_calculada);

        return actualizacion_tabla;
      } 
      catch (error) {
          throw error;
        }
      }
      
      static async goleadores(id_categoria){
        const goleadores = await Jugador_convierte_Partido.obtenerTablaGoleadores(id_categoria);

        var goleadores_ordenados = goleadores.sort(function(elem1, elem2){ 
          let a = parseInt(elem1.goles);
          let b = parseInt(elem2.goles);
          if (a<b) {
          return 1;
          }
        });
        return goleadores_ordenados;
      }
        
  } 

  export default CategoriaService;

