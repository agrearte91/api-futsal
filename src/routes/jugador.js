import { Router } from 'express';
const router = Router();

import { crearJugador} from '../controllers/jugador.controller';

router.post('/', crearJugador)

export default router;

