import { Router } from 'express';
const router = Router();

import ListaInscripcionController from '../controllers/listaInscripcion.controller';

router.get('/',ListaInscripcionController.obtenerListasInscripcion);
router.get('/:id',ListaInscripcionController.obtenerListaInscripcion);
router.get('/jugadoresListados/:id',ListaInscripcionController.obtenerJugadores); //obtener los jugadores listados pertenecientes a una Lista

router.post('/', ListaInscripcionController.crearListaInscripcion);  //Crear una lista de Inscripción (vacía) para un equipo
router.post('/agregarJugadores/:id',ListaInscripcionController.agregarJugadoresEnLista); //recibe un arreglo de jugadores para insertar en lista :id

router.put('/:id',ListaInscripcionController.actualizarListaInscripcion);

router.delete('/:id/eliminarJugador/:dni_jugador',ListaInscripcionController.eliminarJugadorEnLista);
router.delete('/:id',ListaInscripcionController.eliminarListaInscripcion);

export default router;