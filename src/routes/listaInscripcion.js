import { Router } from 'express';
const router = Router();

import ListaInscripcionController from '../controllers/listaInscripcion.controller';
import ListaInscripcionService from '../services/ListaInscripcionService';


router.get('/',ListaInscripcionController.obtenerListasInscripcion);
router.get('/:id',ListaInscripcionController.obtenerListaInscripcion);
router.get('/jugadoresListados/:id',ListaInscripcionController.obtenerJugadores);
router.post('/', ListaInscripcionController.crearListaInscripcion);
router.post('/agregarJugadores/:id',ListaInscripcionController.agregarJugadoresEnLista); //recibe una lista de jugadores para insertar en lista :id
router.delete('/eliminarJugador/:id&:dni_jugador',ListaInscripcionController.eliminarJugadorEnLista);
router.put('/:id',ListaInscripcionController.actualizarListaInscripcion);
router.delete('/:id',ListaInscripcionController.eliminarListaInscripcion);

export default router;