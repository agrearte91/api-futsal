import { Router } from 'express';
const router = Router();

import TablaController from '../controllers/tabla.controller';

router.post('/', TablaController.crearTabla);
router.get('/:id',TablaController.obtenerTabla);
router.get('/',TablaController.obtenerTablas);
router.put('/:id',TablaController.actualizarTabla);
router.delete('/:id',TablaController.eliminarTabla); 

export default router;