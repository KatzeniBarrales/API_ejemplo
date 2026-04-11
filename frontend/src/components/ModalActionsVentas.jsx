import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalActionsVentas = ({ open, onCloseModal, getVentas, edit, venta }) => {
  const initialState = {
    nombreCliente: "",
    tipo_cliente: "",
    tipo_producto: "",
    cantidad: 0
  };

  const [dataVentas, setDataVentas] = useState(initialState);

  // Sincronizar el estado cuando se abre para editar o crear
  useEffect(() => {
    edit ? setDataVentas(venta) : setDataVentas(initialState);
    // eslint-disable-next-line
  }, [edit, venta, open]);

  const handleChange = (e) => {
    setDataVentas({ ...dataVentas, [e.target.name]: e.target.value });
  };

  const saveVenta = async () => {
    try {
      // Usamos la ruta de tu VentaCtrl.crearVenta
      const { data } = await axios.post("/venta", dataVentas);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getVentas();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      Swal.fire({ icon: 'error', title: errorMsg });
      console.log('Error en saveVenta', error.message);
    }
  };

  const updateVenta = async () => {
    try {
      // Usamos la ruta de tu VentaCtrl.UpdateVenta
      const { data } = await axios.put(`/venta/update/${venta._id}`, dataVentas);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getVentas();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      Swal.fire({ icon: 'error', title: errorMsg });
      console.log('Error en updateVenta', error.message);
    }
  };

  const actions = (e) => {
    e.preventDefault();
    edit ? updateVenta() : saveVenta();
  };

  if (!open) return null;

  return (
    <div className="modal-custom"> 
      {/* Aquí va tu estructura de JSX (Inputs, Selects, etc.) */}
      <form onSubmit={actions}>
        <h3>{edit ? "Editar Venta" : "Nueva Venta"}</h3>
        
        <input 
          name="nombreCliente" 
          value={dataVentas.nombreCliente} 
          onChange={handleChange} 
          placeholder="Nombre del Cliente" 
        />

        <select name="tipo_cliente" value={dataVentas.tipo_cliente} onChange={handleChange}>
          <option value="">Seleccione tipo de cliente</option>
          <option value="F">Frecuente</option>
          <option value="M">Mostrador</option>
        </select>

        <select name="tipo_producto" value={dataVentas.tipo_producto} onChange={handleChange}>
          <option value="">Seleccione Producto</option>
          <option value="1">Cilindro ($500)</option>
          <option value="2">Pistón ($700)</option>
          <option value="3">Cadena ($300)</option>
          <option value="4">Pedal ($400)</option>
          <option value="5">Chasis ($900)</option>
        </select>

        <input 
          type="number" 
          name="cantidad" 
          value={dataVentas.cantidad} 
          onChange={handleChange} 
          placeholder="Cantidad" 
        />

        <button type="submit">Guardar</button>
        <button type="button" onClick={onCloseModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default ModalActionsVentas;