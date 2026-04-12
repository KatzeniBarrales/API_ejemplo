import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useVenta } from '../context/VentaContext'; 
import ModalActionsVentas from './ModalActionsVentas';
import Swal from "sweetalert2"; // Importado
import axios from 'axios';      // Importado

const Ventas = () => {
  const { user } = useUser();
  // Jalamos las funciones y el estado del Contexto de Ventas
  const { ventas, deleteVenta, searchVenta, getVentas } = useVenta();

  // Manejo de ventana modal
  const [venta, setVenta] = useState({});
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = (edit, ventaData) => {
    setOpen(true);
    setEdit(edit);
    setVenta(ventaData);
  };
  
  const onCloseModal = () => setOpen(false);

  // Función de búsqueda local que llama al contexto
  const handleSearch = (value) => {
    searchVenta(value);
  };

  return (
    <div>
      <nav className='navbar py-4 bg-light shadow-sm mb-4'>
        <div className='container'>
          <div className='col-md-3'>
            <button className='btn btn-success w-100' onClick={() => onOpenModal(false, {})}>
              <i className='fas fa-cart-plus me-2'></i> Nueva Venta
            </button>
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='input-group'>
              <span className="input-group-text bg-white border-end-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input 
                type="search" 
                className='form-control border-start-0'
                placeholder='Buscar por nombre de cliente...' 
                aria-label='search' 
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card border-0 shadow-sm'>
                <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
                  <h4 className="mb-0">Registro de Ventas</h4>
                  <span className="badge bg-light text-primary">Atiende: {user.name}</span>
                </div>
                <div className='table-responsive'>
                  <table className='table table-hover align-middle mb-0'>
                    <thead className='table-dark'>
                      <tr>
                        <th># FOLIO</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cant.</th>
                        <th>Precio U.</th>
                        <th>IVA (10%)</th>
                        <th>Total</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        ventas.length > 0 ? (
                          ventas.map((item, i) => (
                            <tr key={item._id}>
                              <td>{i + 1}</td>
                              <td>
                                <div className="fw-bold">{item.nombreCliente}</div>
                                <div className="text-muted small">{item.tipo_cliente}</div>
                              </td>
                              <td>{item.descripcion_p}</td>
                              <td>{item.cantidad}</td>
                              <td>${item.precio}</td>
                              <td>${item.Iva ? item.Iva.toFixed(2) : "0.00"}</td>
                              <td className='text-success fw-bold'>
                                ${item.Total ? item.Total.toFixed(2) : "0.00"}
                              </td>
                              <td className="text-center">
                                <button 
                                  className='btn btn-outline-warning btn-sm me-2'
                                  onClick={() => onOpenModal(true, item)}
                                  title="Editar Venta"
                                >
                                  <i className='fas fa-edit'></i>
                                </button>
                                <button 
                                  className='btn btn-outline-danger btn-sm'
                                  onClick={() => deleteVenta(item._id)}
                                  title="Eliminar Venta"
                                >
                                  <i className='fas fa-trash'></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center py-5 text-muted">
                              <i className="fas fa-folder-open fa-3x mb-3 d-block"></i>
                              No se encontraron registros de ventas.
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Actions Ventas */}
      <ModalActionsVentas 
        open={open} 
        onCloseModal={onCloseModal} 
        getVentas={getVentas} 
        edit={edit}
        venta={venta}
      />
    </div>
  );
};

export default Ventas;