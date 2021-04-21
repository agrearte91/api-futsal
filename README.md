# api-futsal
Api Futsal Uncoma

-----------------------------------------------------
Métodos de ruta RECURSO 'Persona'
-----------------------------------------------------

 ```js 
router.get('/', PersonaController.obtenerPersonas);     //obtener todas las personas almacenadas hasta el momento

router.get('/:dni', PersonaController.obtenerPersona);   //obtener persona por campo: dni

router.post('/', PersonaController.crearPersona);   //recibe una persona a insertar en la base
```
- req.body =  
 ```json
            {     
                "dni": 88888888,
                "nombre": "Steven",
                "apellido": "Gerrard",
                "fecha_nacimiento": "1985-08-08",
                "telefono": "2984-888888",
                "correo": null
             }
 ```

```js 
router.post('/crearPersonas', PersonaController.crearPersonas); //recibe un arreglo de personas a insertar en la base
```
- req.body = 
```json
      [ {   "dni": 88888888,
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
```

```js 
router.put('/:dni', PersonaController.actualizarPersona); //actualizar los datos ( de la persona con :dni 
```
- req.body =
```json 
      {     "nombre": "Steven",
            "apellido": "Gerrard",
            "fecha_nacimiento": "1985-08-08",
            "telefono": "2984-888888",
            "correo": "stteven_gerrard8@gmail.com"
       }
```

```js 
router.delete('/:dni', PersonaController.eliminarPersona); //eliminar la persona de la base 
```

-----------------------------------------------------
Métodos de ruta RECURSO 'Jugador'
-----------------------------------------------------
```js
router.get('/',JugadorController.obtenerJugadores); //obtener todos los jugadores almacenados en la base
router.get('/:dni',JugadorController.obtenerJugador); //obtener jugador por :dni

router.post('/',JugadorController.crearJugador); // crea un jugador, de acuerdo a los parámetros pasados en el body (La instancia de Persona, debería estar previamente creada)
```
- req.body =
```json
      {
           "dni": 35187581,
           "legajo": "122280",
           "facultad": "Informática"
       }
```      
```js
router.post('/crearJugadores',JugadorController.crearJugadores); // crea un jugador, de acuerdo a los parámetros pasados en el body
```
- req.body =
```json
      [ {   "dni": 88888888,
            "legajo": "2984-888888",
            "facultad": null
       }, 
       {    "dni": 22222222,
            "nombre": "Rolando",
            "apellido": "Schiavi",
            "fecha_nacimiento": "1979-08-08",
            "telefono": "29856789",
            "correo": null
       } ]
```

```js
router.put('/:dni',JugadorController.actualizarJugador);  //actualizar los datos del jugador con :dni
```
- req.body =
```json
      {
            "legajo": "122280",
            "facultad": "Informática"
       }
```

```js
router.delete('/:dni',JugadorController.eliminarJugador); //elimina el jugador de la base
```

-----------------------------------------------------
Métodos de ruta RECURSO 'Equipo'
-----------------------------------------------------

```js 
router.get('/',EquipoController.obtenerEquipos); 

router.get('/:id',EquipoController.obtenerEquipo);

router.post('/',EquipoController.crearEquipo);   //recibe un equipo a insertar en la base
```
- req.body =  
 ```json
            {     
                "nombre": "Proyecto de Equipo",
            }
 ```

```js 
router.post('/crearEquipos',EquipoController.crearEquipos); //recibe un arreglo de Equipos a insertar en la base
```
- req.body = 
```json
      [{     
            "nombre": "Stark Ladys"
        },
        {
            "nombre": "Mufasas"
        }
      ]
```

```js 
router.put('/:id',EquipoController.actualizarEquipo); //actualizar los datos
```
- req.body =
```json 
      {     
      "nombre": "Stark Ladys II",
      }
```

```js 
router.delete('/:id',EquipoController.eliminarEquipo); 
```

-----------------------------------------------------
Métodos de ruta RECURSO 'Torneo'
-----------------------------------------------------

```js 
router.get('/:anio&:tipo',TorneoController.obtenerTorneo);

router.get('/',TorneoController.obtenerTorneos);

router.get('/listas/:anio&:tipo',TorneoController.obtenerListas);

router.post('/', TorneoController.crearTorneo);   //recibe un Torneo a insertar en la base (ATRIBUTO opcional 'abierto' --> false ) 
```
- req.body =  
 ```json
        {
           "anio": 2021,
           "tipo": "Apertura",
           "nombre": "Héroes de Malvinas",
           "abierto": false
        }
 ```

```js 
router.put('/:anio&:tipo',TorneoController.actualizarTorneo);
```
- req.body = 
```json
      {
            "anio": 2021,
            "tipo": "Apertura",
            "nombre": "Héroes de la guerra de Malvinas",
            "abierto": true
        }
```

```js 
router.delete('/:anio&:tipo',TorneoController.eliminarTorneo);
```

-----------------------------------------------------
Métodos de ruta RECURSO 'Categoría'
-----------------------------------------------------

```js 
router.get('/',CategoriaController.obtenerCategorias);

router.get('/:id',CategoriaController.obtenerCategoria);

router.get('/:nombre/torneo/:anio/:tipo',CategoriaController.obtenerCategoriaDelTorneo); // ejemplo: anio=2021&tipo="Apertura"

router.get('/:id/equipos',CategoriaController.obtenerEquipos); //obtener todos los equipos que pertenezcan a una categoría

router.get('/:id/partidos',CategoriaController.obtenerPartidos); //obtener todos los partidos de una categoría

router.get('/:id/tabla',CategoriaController.obtenerTabla); //obtener el objeto Tabla, correspondiente a una categoría

router.get('/:id/refrescarTabla', CategoriaController.refrescarTabla);  //refrescar (recalcula partidos jugados) y retorna la tabla de posiciones

router.post('/', CategoriaController.crearCategoria);   //recibe una Categoría a insertar en la base (Requiere, torneo previamente creado)
```
- req.body =  
 ```json
         {
            "nombre": "B",
            "tipo": "Masculino",
            "anio_torneo": 2020,
            "tipo_torneo": "Apertura",
        }
 ```

```js 
router.post('/:id/agregarEquipos',CategoriaController.agregarEquipos); //agrego todos los equipos
```

```js 
router.put('/:id/actualizarPartidos', CategoriaController.actualizarPartidos); // se juegan partidos y se debe actualizar los registros Partido
```
- req.body = (Por ejemplo, partidos de la categoría 14)
```json
      {
            "id_partido": 27,
            "goles_local": 2,
            "goles_visitante": 2,
            "jugado": true
        },
        {
            "id_partido": 28,
            "goles_local": 2,
            "goles_visitante": 1,
            "jugado": true
        },
```
