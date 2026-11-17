import {altasSocios, eliminarSocios, modificarSocios, mostrarSocios} from '../controlador/SociosController.js';
import express from 'express';
const rutaSocio = express.Router();

rutaSocio.post('/altas', altasSocios);

rutaSocio.get('/listar', mostrarSocios);

rutaSocio.put('/modificar', modificarSocios);

rutaSocio.delete('/eliminar/:id', eliminarSocios);

export {rutaSocio}
