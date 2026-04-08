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
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const VentaShema = new Schema({
    fecha: {
        type: Date, default: Date.now,
    },
    nombreCliente: {
        type: String,
        required: true,
    },
    empleado: {
        type: Schema.Types.ObjectId, ref: 'usuario', // referencia al modelo de usuario
    },
    tipo_cliente: {
        type: String, enum: ['Frecuente', 'Mostrador'], required: true
    },
    tipo_producto: {
        type: String, required: true,
    },
    descripcion_p: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    Costo: {
        type: Number,
    },
    Iva: {
        type: Number,
    },
    Total: {
        type: Number,
    },
}, {
    timestamps: true,
});

export const VentaModel = model('venta', VentaShema);