# api-futsal
Api Futsal Uncoma

#####################################################################################################################################

Métodos de ruta RECURSO 'Persona'

router.get('/', PersonaController.obtenerPersonas);      // obtener todas las personas almacenadas hasta el momento
router.get('/:dni', PersonaController.obtenerPersona);   //obtener persona por campo: dni

router.post('/', PersonaController.crearPersona); // recibe una persona a insertar en la base

    # req.body = 
      {     "dni": 88888888,
            "nombre": "Steven",
            "apellido": "Gerrard",
            "fecha_nacimiento": "1985-08-08",
            "telefono": "2984-888888",
            "correo": null
       }

router.post('/crearPersonas', PersonaController.crearPersonas); //recibe un arreglo de personas a insertar en la base

    # req.body = 
      [ {     "dni": 88888888,
            "nombre": "Steven",
            "apellido": "Gerrard",
            "fecha_nacimiento": "1985-08-08",
            "telefono": "2984-888888",
            "correo": null
       }, 
       {    "dni": 22222222,
            "nombre": "Rolando",
            "apellido": "Schiavi",
            "fecha_nacimiento": "1979-08-08",
            "telefono": "29856789",
            "correo": null
       }]

router.put('/:dni', PersonaController.actualizarPersona); //actualizar los datos ( de la persona con :dni

    # req.body = 
      {     "nombre": "Steven",
            "apellido": "Gerrard",
            "fecha_nacimiento": "1985-08-08",
            "telefono": "2984-888888",
            "correo": "stteven_gerrard8@gmail.com"
       }

router.delete('/:dni', PersonaController.eliminarPersona); //eliminar la persona de la base

#####################################################################################################################################


Métodos de ruta RECURSO 'Jugador'

router.post('/', JugadorController.crearJugador); // crea un jugador, de acuerdo a los parámetros pasados en el body

router.get('/', JugadorController.obtenerJugadores); //obtener todos los jugadores almacenados en la base
router.get('/:dni',JugadorController.obtenerJugador); //obtener jugador por :dni
router.put('/:dni',JugadorController.actualizarJugador);  //actualizar los datos del jugador con :dni
router.delete('/:dni',JugadorController.eliminarJugador); //elimina el jugador de la base

