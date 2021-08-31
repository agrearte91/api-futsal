import { Router } from 'express';
const router = Router();

import Jugador_convierte_Partido from '../controllers/Jugador_convierte_Partido.controller';

router.get('/',Jugador_convierte_Partido.obtenerTuplas);
router.get('/obtenerGoles/:id_partido',Jugador_convierte_Partido.obtenerTuplasEnPartido);
router.get('/:dni_jugador&:id_partido',Jugador_convierte_Partido.obtenerTupla);

router.post('/',Jugador_convierte_Partido.crearTupla);
router.post('/crearTuplas',Jugador_convierte_Partido.crearTuplas);

export default router;

