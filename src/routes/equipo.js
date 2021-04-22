import { Router } from 'express';
const router = Router();

import EquipoController from '../controllers/equipo.controller';

router.get('/',EquipoController.obtenerEquipos);
//router.get('/nombre=:nombre',EquipoController.obtenerEquipo);
router.get('/:id',EquipoController.obtenerEquipo);

router.post('/',EquipoController.crearEquipo);
router.post('/crearEquipos',EquipoController.crearEquipos);

router.put('/:id',EquipoController.actualizarEquipo);

router.delete('/:id',EquipoController.eliminarEquipo); 

export default router;

