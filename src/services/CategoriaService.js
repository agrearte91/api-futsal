import Categoria from '../models/Categoria';
import Torneo from '../models/Torneo';
import Partido from '../models/Partido';
import Equipo from '../models/Equipo';

import Categoria_contiene_Equipo from '../models/Categoria_contiene_Equipo';
import Categoria_contiene_EquipoService from './Categoria_contiene_EquipoService';
import EquipoService from './EquipoService';
import PartidoService from './PartidoService';
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
        //CategoriaService.obtenerTorneo(categoria.id_categoria);
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

      static async generarTabla(id_categoria){
        try {
          const equipos = await Categoria_contiene_EquipoService.obtenerEquipos(id_categoria);
          const tabla = [];

          if (equipos){

            for (var i in equipos){
              const equipo_categoria = equipos[i];
              const id_equipo = await equipo_categoria.id_equipo;
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

            var tabla2 = {};
            tabla2.tabla = tabla;

            const categoria = await CategoriaService.obtenerCategoria(id_categoria);

            const tablaActualizada = await TablaService.actualizarTabla(categoria.id_tabla,tabla); 

            /*console.log("la tabla de la Categoria es ",categoria.id_tabla);
            //const categoriaActualizada = await CategoriaService.actualizarCategoria(id_categoria,categoria);

            console.log("tabla generada para la categoria",tabla2);

            console.log("Tabla actualizada?", tablaActualizada); */


            return tabla2;
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

          //console.log("Tabla", tabla);

          const id_equipo_local = partido.id_equipo_local;
          const id_equipo_visitante = partido.id_equipo_visitante;
          
          var goles_local = partido.goles_local;
          var goles_visitante = partido.goles_visitante;
         

          var tablaPuntaje = tabla.tabla;

          //console.log("Tabla", tablaPuntaje);
          
          var fila_equipo_local = tablaPuntaje.filter(function (fila) {
            //console.log(fila);
            return fila.id_equipo == id_equipo_local;
          });

          //console.log("Tabla equipo local", fila_equipo_local);

          var fila_equipo_visitante = tablaPuntaje.filter(function(fila){
            return fila.id_equipo == id_equipo_visitante;
          });

          //console.log("Tabla equipo visitante", fila_equipo_visitante);

          if(goles_local>goles_visitante){
            fila_equipo_local[0].puntos =+ 3;
            fila_equipo_local[0].partidos_ganados =+1;

            fila_equipo_visitante[0].partidos_perdidos =+1;
          }
          else{
            if(goles_local<goles_visitante){
              fila_equipo_visitante[0].puntos=+3;
              fila_equipo_visitante[0].partidos_ganados =+1;

              fila_equipo_local[0].partidos_perdidos =+1;
            }
            else{
              fila_equipo_local[0].puntos =+ 1;
              fila_equipo_visitante[0].puntos=+1;
              
              fila_equipo_local[0].partidos_empatados =+1;
              fila_equipo_visitante[0].partidos_empatados =+1;
            }
          }

          fila_equipo_local[0].partidos_jugados =+1;
          fila_equipo_local[0].goles_favor =+ goles_local;
          fila_equipo_local[0].goles_contra =+ goles_visitante;
          fila_equipo_local[0].diferencia_goles = fila_equipo_local[0].goles_favor -  fila_equipo_local[0].goles_contra;

          fila_equipo_visitante[0].partidos_jugados =+1;
          fila_equipo_visitante[0].goles_favor =+ goles_visitante;
          fila_equipo_visitante[0].goles_contra =+ goles_local;
          fila_equipo_visitante[0].diferencia_goles = fila_equipo_visitante[0].goles_favor -  fila_equipo_visitante[0].goles_contra;


// ------------------------------------------------------------------------------------------------------------
      /*   console.log("Tabla equipo local", fila_equipo_local);

          console.log("Tabla equipo visitante", fila_equipo_visitante);


          console.log("-------------------------------------------------");
          console.log("TABLA",tabla);  */ 
//-------------------------------------------------------------------------------------------------------------
          ///ACÁ TENGO QUE ACTUALIZAR LA TABLA! 

          return tabla;
        
        }
        catch (error) {
          throw error;
        }
      }

      static async computarPartidos(id_categoria,partidosJugados){
        var tabla = await CategoriaService.obtenerTabla(id_categoria);

        for (var i in partidosJugados){
          var partidoJugado = partidosJugados[i];
          const id_partido = partidoJugado.id_partido;
          
          const partidoActualizado = await PartidoService.actualizarPartido(id_partido,partidoJugado);

          await tabla.reload();   // chequear esto después
          tabla = await CategoriaService.computarPartido(tabla,partidoActualizado);

          /* {
            "id_partido": 7,
            "nro_fecha": 1,
            "goles_local": 3,
            "goles_visitante": 1,
            "jugado": false,
            "id_categoria": 8,
            "id_equipo_local": 12,
            "id_equipo_visitante": 1,
            "dni_arbitro": 88888888,
            "dni_asistente": null
        } */
          
        }
      
      }


      static async actualizarTabla(id_categoria){
        const partidos = await CategoriaService.obtenerPartidos(id_categoria);

        var partidos_jugados = partidos.filter(function (partido) {
          //console.log(fila);
          return partido.jugado == true;
        });
        
      }
  } 

  export default CategoriaService;

