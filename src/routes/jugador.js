import { Router } from 'express';
const router = Router();

import JugadorController from '../controllers/jugador.controller';

router.get('/',JugadorController.obtenerJugadores); //obtener todos los jugadores almacenados en la base
router.get('/:dni',JugadorController.obtenerJugador); //obtener jugador por :dni

router.post('/',JugadorController.crearJugador); // crea un jugador, de acuerdo a los parámetros pasados en el body
router.post('/crearJugadores',JugadorController.crearJugadores); // crea un jugador, de acuerdo a los parámetros pasados en el body

router.put('/:dni',JugadorController.actualizarJugador);  //actualizar los datos del jugador con :dni

router.delete('/:dni',JugadorController.eliminarJugador); //elimina el jugador de la base


export default router;

