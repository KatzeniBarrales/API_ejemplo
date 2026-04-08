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

VentaCtrl.crearVenta = async (req, res) => {
    try {
        const data = req.body;
        const tipo_producto = data.tipo_producto;
        // Validar tipo_cliente
        if (data.tipo_cliente === "F") {
            data.tipo_cliente = "Frecuente";
        } else if (data.tipo_cliente === "M") {
            data.tipo_cliente = "Mostrador";
        } else {
            return messageGeneral(res, 400, false, "", "Tipo de cliente no válido (Use F o M)");
        }
        // Asignar precio y descripción según el tipo de producto
        if (tipo_producto === "1") {
            data.precio = 500;
            data.descripcion_p = "Cilindro";
        } else if (tipo_producto === "2") {
            data.precio = 700;
            data.descripcion_p = "Pistón";
        } else if (tipo_producto === "3") {
            data.precio = 300;
            data.descripcion_p = "Cadena";
        } else if (tipo_producto === "4") {
            data.precio = 400;
            data.descripcion_p = "Pedal";
        } else if (tipo_producto === "5") {
            data.precio = 900;
            data.descripcion_p = "Chasis";
        } else {
            return messageGeneral(res, 400, false, "", "Tipo de producto no válido");
        }
        //calcular el iva y total
        data.Iva = (data.precio * data.cantidad) * 0.1;
        data.Total = (data.precio * data.cantidad) + data.Iva;

        const resp = await VentaModel.create({ ...data, empleado: req.userid });
        messageGeneral(res, 201, true, resp, "Venta creada!!!");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
VentaCtrl.listAllVentas = async (req, res) => {
    try {
        const resp = await VentaModel.find().populate('empleado');
        messageGeneral(res, 200, true, resp, "Listado de ventas");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
VentaCtrl.listById = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await VentaModel.findById(id).populate('empleado');
        if (!resp) {
            return messageGeneral (res, 404, false, "", "Venta no encontrada");
        }
        messageGeneral(res, 200, true, resp, "");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
VentaCtrl.deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await VentaModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Venta no encontrada");
        }
        await resp.deleteOne();
        messageGeneral(res, 200, true, "", "Venta eliminada");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
VentaCtrl.UpdateVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const resp = await VentaModel.findById(id);
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Venta no encontrada");
        }

        if (data.tipo_cliente) {
            if (data.tipo_cliente === "F") data.tipo_cliente = "Frecuente";
            else if (data.tipo_cliente === "M") data.tipo_cliente = "Mostrador";
        }

        // Recalcular precios si cambia el producto o la cantidad
        const productoABuscar = data.tipo_producto;
        const cantidadActual = data.cantidad;

        // Re-asignar precio según el producto (mismo bloque de IFs)
        if (productoABuscar === "1") { data.precio = 500; data.descripcion_p = "Cilindro"; }
        else if (productoABuscar === "2") { data.precio = 700; data.descripcion_p = "Pistón"; }
        else if (productoABuscar === "3") { data.precio = 300; data.descripcion_p = "Cadena"; }
        else if (productoABuscar === "4") { data.precio = 400; data.descripcion_p = "Pedal"; }
        else if (productoABuscar === "5") { data.precio = 900; data.descripcion_p = "Chasis"; }

        const precioFinal = data.precio || resp.precio;
        data.Iva = (precioFinal * cantidadActual) * 0.1;
        data.Total = (precioFinal * cantidadActual) + data.Iva;

        await resp.updateOne(data);
        messageGeneral(res, 200, true, "", "Venta actualizada con éxito");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
VentaCtrl.searchVenta = async (req, res) => {
    try {
        const { nombres } = req.params;

        const resp = await VentaModel.find({
            nombreCliente: { $regex: nombres, $options: "i" }
        });

        messageGeneral(res, 200, true, resp, "Resultados de la búsqueda");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
VentaCtrl.deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const resp = await VentaModel.findByIdAndDelete(id);
        messageGeneral(res, 200, true, resp, "Venta eliminada correctamente");
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message);
    }
};
export default VentaCtrl;