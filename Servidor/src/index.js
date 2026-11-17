import express from 'express';
import cors  from 'cors';


const puerto = 3001
const app = express();

app.use(cors());
app.use(express.json())

import {rutas} from './rutas/rutaInicio.js';
app.use(rutas);

app.listen(puerto, ()=>{
    console.log(`servidor iniciando en el puerto ${puerto}`);
})