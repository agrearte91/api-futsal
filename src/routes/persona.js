import { Router } from 'express';
const router = Router();

import PersonaController from '../controllers/persona.controller';

//router.post('/', crearPersona);
router.post('/',PersonaController.crearPersona);
router.get('/',PersonaController.obtenerPersonas);
router.get('/:dni',PersonaController.obtenerPersona);
router.put('/:dni',PersonaController.actualizarPersona);
router.delete('/:dni',PersonaController.eliminarPersona);

export default router;