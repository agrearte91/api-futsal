import { Router } from 'express';
const router = Router();

import TorneoController from '../controllers/torneo.controller';

router.post('/', TorneoController.crearTorneo);
router.get('/:anio&:tipo',TorneoController.obtenerTorneo);
router.get('/',TorneoController.obtenerTorneos);
router.get('/listas/:anio&:tipo',TorneoController.obtenerListas);


router.put('/:anio&:tipo',TorneoController.actualizarTorneo);

router.put('/:anio&:tipo',TorneoController.actualizarTorneo);
router.delete('/:anio&:tipo',TorneoController.eliminarTorneo);

export default router;