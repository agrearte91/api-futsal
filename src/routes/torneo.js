import { Router } from 'express';
const router = Router();

import TorneoController from '../controllers/torneo.controller';

router.get('/:anio&:tipo',TorneoController.obtenerTorneo);
router.get('/',TorneoController.obtenerTorneos);
router.get('/listas/:anio&:tipo',TorneoController.obtenerListas);

router.post('/', TorneoController.crearTorneo);  //recibe un Torneo a insertar en la base

router.put('/:anio&:tipo',TorneoController.actualizarTorneo);

router.delete('/:anio&:tipo',TorneoController.eliminarTorneo);

export default router;