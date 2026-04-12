import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { useUser } from "../context/UserContext";

const ModalActionsVentas = ({ open, onCloseModal, getVentas, edit, venta }) => {
  const { user } = useUser();

  const initialState = {
    nombreCliente: "",
    tipo_cliente: "",
    tipo_producto: "",
    cantidad: "",
    descripcion_p: ""
  };

  const [dataVentas, setDataVentas] = useState(initialState);

  // Sincronizar el estado con el diseño de empleados
  useEffect(() => {
    if (edit && venta) {
      console.log("Venta recibida:", venta); // REVISA ESTO EN LA CONSOLA (F12)

      setDataVentas({
        ...venta,
        // Si en la DB el campo se llama distinto, aquí lo unificamos:
        tipo_cliente: venta.tipo_cliente || venta.tipo || "",
        tipo_producto: venta.tipo_producto || ""
      });
    } else {
      setDataVentas(initialState);
    }
    // eslint-disable-next-line
  }, [edit, venta, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tipo_producto") {
      const productos = {
        "1": "Cilindro",
        "2": "Pistón",
        "3": "Cadena",
        "4": "Pedal",
        "5": "Chasis"
      };
      setDataVentas({
        ...dataVentas,
        [name]: value,
        descripcion_p: productos[value] || ""
      });
    } else {
      setDataVentas({ ...dataVentas, [name]: value });
    }
  };

  const saveVenta = async () => {
    // Creamos una copia de los datos para no modificar lo que el usuario ve en el formulario
    const dataAEnviar = {
      ...dataVentas,
      // Si el valor es "Frecuente", enviamos "F", si es "Mostrador", enviamos "M"
      // Si ya es una letra, la dejamos tal cual.
      tipo_cliente: dataVentas.tipo_cliente === "Frecuente" ? "F" :
        dataVentas.tipo_cliente === "Mostrador" ? "M" :
          dataVentas.tipo_cliente
    };

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      // Enviamos 'dataAEnviar' en lugar de 'dataVentas'
      const { data } = await axios.post("http://localhost:4000/api/venta", dataAEnviar, config);

      if (data.ok) {
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
        onCloseModal();
        getVentas();
      }
    } catch (error) {
      // Si el backend responde con error, aquí verás el mensaje de "Tipo de cliente no válido"
      const errorMsg = error.response?.data?.message || "Error al guardar venta";
      Swal.fire({ icon: 'error', title: errorMsg });
    }
  };

  const updateVenta = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(`http://localhost:4000/api/venta/update/${venta._id}`, dataVentas, config);

      if (data.ok) {
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
        onCloseModal();
        getVentas();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al actualizar";
      Swal.fire({ icon: 'error', title: errorMsg });
    }
  };

  const actions = (e) => {
    e.preventDefault();
    edit ? updateVenta() : saveVenta();
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="card" style={{ minWidth: '350px', border: 'none' }}>
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">{edit ? "Actualizar Venta" : "Agregar Venta"}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={actions}>
            <div className="mb-3">
              <label className="form-label">Nombre del Cliente:</label>
              <input
                type="text"
                className="form-control"
                name="nombreCliente"
                required
                autoFocus
                onChange={handleChange}
                value={dataVentas.nombreCliente}
              />
            </div>

            <select
              name="tipo_cliente"
              className="form-select"
              required
              onChange={handleChange}
              value={dataVentas.tipo_cliente || ""}
            >
              <option value="">Seleccione...</option>
              <option value="Frecuente">Frecuente</option>
              <option value="Mostrador">Mostrador</option>
            </select>

            <div className="mb-3">
              <label className="form-label">Producto:</label>
              <select
                name="tipo_producto"
                className="form-select"
                required
                onChange={handleChange}
                value={dataVentas.tipo_producto}
              >
                <option value="">Seleccione Producto</option>
                <option value="1">Cilindro ($500)</option>
                <option value="2">Pistón ($700)</option>
                <option value="3">Cadena ($300)</option>
                <option value="4">Pedal ($400)</option>
                <option value="5">Chasis ($900)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Cantidad:</label>
              <input
                type="number"
                className="form-control"
                name="cantidad"
                required
                min="1"
                onChange={handleChange}
                value={dataVentas.cantidad}
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary form-control">
                {edit ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalActionsVentas;