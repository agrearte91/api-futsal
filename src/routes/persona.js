import { Router } from 'express';
const router = Router();

import PersonaController from '../controllers/persona.controller';


router.get('/',PersonaController.obtenerPersonas); // obtener todas las personas almacenadas hasta el momento
router.get('/:dni',PersonaController.obtenerPersona); //obtener persona por campo: dni

router.post('/',PersonaController.crearPersona); // recibe una persona a insertar en la base
router.post('/crearPersonas',PersonaController.crearPersonas); //recibe un arreglo de personas a insertar en la base

router.put('/:dni',PersonaController.actualizarPersona); //actualizar los datos de la persona con :dni

router.delete('/:dni',PersonaController.eliminarPersona); //eliminar la persona de la base 

export default router;