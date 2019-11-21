import { Router } from 'express';
const router = Router();

import { crearPersona, obtenerPersonas, obtenerPersona, eliminarPersona, actualizarPersona } from '../controllers/persona.controller';


router.post('/', crearPersona)
router.get('/', obtenerPersonas)
router.get('/:dni', obtenerPersona)
router.put('/:dni',actualizarPersona)
router.delete('/:dni',eliminarPersona)

export default router;