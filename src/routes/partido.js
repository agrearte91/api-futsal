import { Router } from 'express';
const router = Router();

import PartidoController from '../controllers/partido.controller';

router.get('/',PartidoController.obtenerPartidos);
router.post('/',PartidoController.crearPartido);
router.post ('/crearPartidos',PartidoController.crearPartidos);
router.get('/:id',PartidoController.obtenerPartido);
router.put('/actualizarPartido/:id',PartidoController.actualizarPartido);
router.put('/actualizarPartidos',PartidoController.actualizarPartidos);
router.delete('/:id',PartidoController.eliminarPartido); 

export default router;

