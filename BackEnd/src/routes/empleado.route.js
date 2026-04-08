import {Router} from 'express';
import empleadoCtrl from '../controllers/empleado.controller.js';
import {verificarToken} from'../middlewares/Auth.js';
const route = Router();

route.post('/',verificarToken,empleadoCtrl.createEmpleado);
route.get('/',empleadoCtrl.listAllEmpleados);
route.get('/listid/:id',verificarToken,empleadoCtrl.listById);
route.delete('/delete/:id',verificarToken,empleadoCtrl.deleteEmpleado);
route.put('/update/:id',verificarToken,empleadoCtrl.updateEmpleado);
route.get('/listboss',verificarToken,empleadoCtrl.listEmployeeBoss);
route.get('/search/:nombres',verificarToken,empleadoCtrl.searchEmployee);

export default route;
