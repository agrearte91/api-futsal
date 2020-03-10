import { Router } from 'express';
const router = Router();

import PartidoController from '../controllers/partido.controller';

router.get('/',PartidoController.obtenerPartidos);
router.post('/',PartidoController.crearPartido);
router.get('/:id',PartidoController.obtenerPartido);
router.put('/:id',PartidoController.actualizarPartido);
router.delete('/:id',PartidoController.eliminarPartido); 

export default router;

