import { Router } from 'express';
const router = Router();

import JugadorController from '../controllers/jugador.controller';

router.post('/',JugadorController.crearJugador);
router.get('/',JugadorController.obtenerJugadores);
router.get('/:dni',JugadorController.obtenerJugador);
router.put('/:dni',JugadorController.actualizarJugador);
router.delete('/:dni',JugadorController.eliminarJugador);


export default router;

