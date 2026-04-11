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
import { VentaModel } from "../models/venta.model.js";
import messages from "../utils/messages.js";
const { messageGeneral } = messages;

const VentaCtrl = {};

// 1. CREAR VENTA (Asignando el empleado logueado automáticamente)
VentaCtrl.crearVenta = async (req, res) => {
    try {
        const data = req.body;
        
        // Validar tipo_cliente
        if (data.tipo_cliente === "F") data.tipo_cliente = "Frecuente";
        else if (data.tipo_cliente === "M") data.tipo_cliente = "Mostrador";
        else return messageGeneral(res, 400, false, "", "Tipo de cliente no válido (Use F o M)");

        // Asignar precio y descripción según el tipo de producto
        const productos = {
            "1": { precio: 500, desc: "Cilindro" },
            "2": { precio: 700, desc: "Pistón" },
            "3": { precio: 300, desc: "Cadena" },
            "4": { precio: 400, desc: "Pedal" },
            "5": { precio: 900, desc: "Chasis" }
        };

        const prodInfo = productos[data.tipo_producto];
        if (!prodInfo) return messageGeneral(res, 400, false, "", "Tipo de producto no válido");

        data.precio = prodInfo.precio;
        data.descripcion = prodInfo.desc;

        // Calcular IVA (10%) y Total
        data.Iva = (data.precio * data.cantidad) * 0.1;
        data.Total = (data.precio * data.cantidad) + data.Iva;

        // Guardamos la venta vinculada al ID del empleado que viene del token
        const resp = await VentaModel.create({ ...data, empleado: req.userid });
        messageGeneral(res, 201, true, resp, "Venta creada!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

// 2. LISTAR VENTAS (Solo las del empleado logueado)
VentaCtrl.listAllVentas = async (req, res) => {
    try {
        const resp = await VentaModel.find({ empleado: req.userid }).populate('empleado');
        messageGeneral(res, 200, true, resp, "Listado de tus ventas");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

// 3. BUSCAR VENTA (Solo dentro de las ventas del empleado)
VentaCtrl.searchVenta = async (req, res) => {
    try {
        const { nombres } = req.params;
        const resp = await VentaModel.find({
            nombreCliente: { $regex: nombres, $options: "i" },
            empleado: req.userid // Filtro de seguridad
        });
        messageGeneral(res, 200, true, resp, "Resultados de la búsqueda");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

// 4. ACTUALIZAR VENTA (Solo si pertenece al empleado)
VentaCtrl.UpdateVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Verificamos que la venta exista Y sea del empleado
        const ventaExistente = await VentaModel.findOne({ _id: id, empleado: req.userid });
        if (!ventaExistente) {
            return messageGeneral(res, 404, false, "", "Venta no encontrada o no tienes permiso");
        }

        if (data.tipo_cliente) {
            if (data.tipo_cliente === "F") data.tipo_cliente = "Frecuente";
            else if (data.tipo_cliente === "M") data.tipo_cliente = "Mostrador";
        }

        // Si cambia el producto o la cantidad, recalculamos
        const tipoProd = data.tipo_producto || ventaExistente.tipo_producto;
        const cant = data.cantidad || ventaExistente.cantidad;

        const productos = {
            "1": { precio: 500, desc: "Cilindro" },
            "2": { precio: 700, desc: "Pistón" },
            "3": { precio: 300, desc: "Cadena" },
            "4": { precio: 400, desc: "Pedal" },
            "5": { precio: 900, desc: "Chasis" }
        };

        if (data.tipo_producto) {
            data.precio = productos[tipoProd].precio;
            data.descripcion_p = productos[tipoProd].desc;
        }

        const precioFinal = data.precio || ventaExistente.precio;
        data.Iva = (precioFinal * cant) * 0.1;
        data.Total = (precioFinal * cant) + data.Iva;

        await ventaExistente.updateOne(data);
        messageGeneral(res, 200, true, "", "Venta actualizada con éxito");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

// 5. ELIMINAR VENTA (Solo si pertenece al empleado)
VentaCtrl.deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;
        // Buscamos y eliminamos solo si el empleado es el dueño
        const resp = await VentaModel.findOneAndDelete({ _id: id, empleado: req.userid });
        
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Venta no encontrada o sin autorización");
        }
        messageGeneral(res, 200, true, resp, "Venta eliminada correctamente");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};

export default VentaCtrl;