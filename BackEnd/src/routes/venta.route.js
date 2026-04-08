/*
EVALUACIÓN PARCIAL 2 
 APLICACIONES WEB ORIENTADAS A SERVICIOS 
 ---------------------
 REFACCIONARIA - MOTOS
 ---------------------
 NOMBRES: Fernanda Katzeni Barrales López, Santiago Jasso Espino y Dulce Yoselyn Pérez Martínez.
 GRUPO: 5°A
 FECHA: 17/03/2026
 */
import {Router} from 'express';
import VentaCtrl from '../controllers/venta.controller.js';
import { verificarToken } from '../middlewares/Auth.js';
const router = Router();
router.post('/',verificarToken,  VentaCtrl.crearVenta);
router.get('/',verificarToken, VentaCtrl.listAllVentas);
router.get('/listid/:id',verificarToken, VentaCtrl.listById);
router.delete('/delete/:id',verificarToken, VentaCtrl.deleteVenta);
router.put('/update/:id',verificarToken, VentaCtrl.UpdateVenta);
router.get('/search/:nombres',verificarToken, VentaCtrl.searchVenta);

export default router;