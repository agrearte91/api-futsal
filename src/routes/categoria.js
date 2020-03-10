import { Router } from 'express';
const router = Router();

import CategoriaController from '../controllers/categoria.controller';


router.get('/',CategoriaController.obtenerCategorias);
router.get('/:id',CategoriaController.obtenerCategoria);
router.get('/equipos/:id',CategoriaController.obtenerEquipos);
router.get('/partidos/:id',CategoriaController.obtenerPartidos);

router.get('/computarPartido/:id_categoria&:id_partido',CategoriaController.computarPartido);

router.post('/', CategoriaController.crearCategoria);

//router.post('/actualizarTabla/:id',actualizarTabla);

router.post('/agregarEquipos/:id',CategoriaController.agregarEquipos);
router.put('/:id',CategoriaController.actualizarCategoria);

router.put('cargarPartidos/:id',CategoriaController.computarPartidos);

router.delete('/:id',CategoriaController.eliminarCategoria); 

export default router;