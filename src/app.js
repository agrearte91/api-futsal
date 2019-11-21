import express, { json } from 'express';
import morgan from 'morgan';

import personaRoutes from './routes/persona';
import jugadorRoutes from './routes/jugador';
const app = express();

//midelwares
app.use(morgan('dev')); //muestra por consola lo que va llegando
app.use(json()); //para que el servidor entienda los datos en formato json

//

app.use('/api/persona', personaRoutes);
app.use('/api/jugador', jugadorRoutes);

export default app;