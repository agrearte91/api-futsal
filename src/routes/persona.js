import { Router } from 'express';
const router = Router();

import { crearPersona } from '../controllers/persona.controller';


router.post('/', crearPersona)

export default router;