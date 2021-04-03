import { Router } from 'express';
const router = Router();

import CategoriaController from '../controllers/categoria.controller';


router.get('/',CategoriaController.obtenerCategorias);
router.get('/:id',CategoriaController.obtenerCategoria);
router.get('/:id/equipos',CategoriaController.obtenerEquipos);
router.get('/:id/partidos',CategoriaController.obtenerPartidos);

router.get('/:id/tabla',CategoriaController.obtenerTabla);
router.get('/:id/refrescarTabla', CategoriaController.refrescarTabla);



router.post('/', CategoriaController.crearCategoria);
router.post('/:id/agregarEquipos',CategoriaController.agregarEquipos); //agrego todos los equipos y actualizo la tabla



router.put('/:id/actualizarPartidos', CategoriaController.actualizarPartidos); // se juegan partidos y se debe actualizar los objetos partidos y la tabla de la categoría.

router.delete('/:id',CategoriaController.eliminarCategoria); 
router.delete('/:id/EliminarEquipo',CategoriaController.eliminarEquipo); 

export default router;