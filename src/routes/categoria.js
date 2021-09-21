import { Router } from 'express';
const router = Router();

import CategoriaController from '../controllers/categoria.controller';


router.get('/',CategoriaController.obtenerCategorias);
router.get('/:id',CategoriaController.obtenerCategoria);
router.get('/:nombre/torneo/:anio/:tipo',CategoriaController.obtenerCategoriaDelTorneo);
router.get('/torneo/:anio/:tipo',CategoriaController.obtenerCategoriasDelTorneo);



router.get('/:id/equipos',CategoriaController.obtenerEquipos);   //obtener todos los equipos que pertenezcan a una categoría
router.get('/:id/partidos',CategoriaController.obtenerPartidos); //obtener todos los partidos (jugados o no) de una categoría

router.get('/:id/tabla',CategoriaController.obtenerTabla);  //obtener el objeto Tabla, correspondiente a una categoría
router.get('/:id/refrescarTabla', CategoriaController.refrescarTabla);  //refrescar (recalcula partidos jugados) y retorna la tabla de posiciones
router.get('/:id/goleadores', CategoriaController.goleadores) //obtener la tabla de goleadores de la categoria

router.post('/', CategoriaController.crearCategoria);  //recibe una Categoría a insertar en la base (Requiere, torneo previamente creado)
router.post('/:id/agregarEquipos',CategoriaController.agregarEquipos); //agrego todos los equipos


router.put('/:id/actualizarPartidos', CategoriaController.actualizarPartidos); // se juegan partidos y se debe actualizar los registros Partido

router.delete('/:id',CategoriaController.eliminarCategoria); 
router.delete('/:id/EliminarEquipo/:id_equipo',CategoriaController.eliminarEquipo); 

export default router;