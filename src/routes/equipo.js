import { Router } from 'express';
const router = Router();

import EquipoController from '../controllers/equipo.controller';

router.post('/',EquipoController.crearEquipo);
router.get('/',EquipoController.obtenerEquipos);
router.get('/nombre=:nombre',EquipoController.obtenerEquipo);
router.get('/:id',EquipoController.obtenerEquipo);
router.put('/:id',EquipoController.actualizarEquipo);

/*router.delete('/:id',EquipoController.eliminarEquipo); */

export default router;

