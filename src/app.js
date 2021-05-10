import express, { json } from 'express';
import morgan from 'morgan';

import personaRoutes from './routes/persona';
import jugadorRoutes from './routes/jugador';
import torneoRoutes from './routes/torneo';
import categoriaRoutes from './routes/categoria';
import equipoRoutes from './routes/equipo';
import listaInscripcionRoutes from './routes/listaInscripcion';
import tablaRoutes from './routes/tabla';
import partidoRoutes from './routes/partido';
import golRoutes from './routes/gol';




const app = express();


//midelwares
app.use(morgan('dev')); //muestra por consola lo que va llegando
app.use(json()); //para que el servidor entienda los datos en formato json

//

app.use('/api/persona', personaRoutes);
app.use('/api/jugador', jugadorRoutes);
app.use('/api/torneo', torneoRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/equipo', equipoRoutes);
app.use('/api/listaInscripcion', listaInscripcionRoutes);
app.use('/api/tabla', tablaRoutes);
app.use('/api/partido', partidoRoutes);
app.use('/api/gol', golRoutes);



export default app;