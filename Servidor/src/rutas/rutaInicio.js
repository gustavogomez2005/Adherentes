import express from 'express';
import {rutaSocio} from './rutasSocios.js';

const rutas = express.Router();

rutas.use(rutaSocio);

export {rutas}