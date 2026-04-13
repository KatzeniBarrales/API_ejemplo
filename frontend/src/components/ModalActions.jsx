import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ModalActions = ({ open, onCloseModal, data, setData, save, edit }) => {

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Forzamos el nivel 2 internamente antes de guardar
    const dataWithLevel = { ...data, nivel: "2" };
    
    // Si tu función save usa directamente el estado 'data' del padre, 
    // asegúrate de que el initialState en Employees.jsx ya tenga nivel: "2"
    save(dataWithLevel); 
  };

  if (!data) return null;

  return (
    <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'customModal' }}>
      <div className="p-2" style={{ minWidth: '350px' }}>
        
        <div className="text-center mb-4">
          <i className="fas fa-user-plus mb-3" style={{ fontSize: '50px', color: '#888', marginTop: '10px' }}></i>
          <h4 className="text-uppercase" style={{ color: '#555', letterSpacing: '3px', fontWeight: '300' }}>
            {edit ? 'Editar Empleado' : 'Añadir Empleado'}
          </h4>
          {/* Badge sutil para indicar el rol automáticamente */}
          <span className="badge bg-light text-dark border text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>
            Nivel 2 [Empleado]
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* NOMBRE */}
          <div className="mb-4">
            <label className="form-label" style={{ color: '#999', fontSize: '14px' }}>Nombre:</label>
            <input 
              type="text" 
              name="name" 
              value={data.name || ""} 
              className="form-control" 
              style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
              autoFocus
              onChange={handleChange} 
              required 
            />
          </div>

          {/* CORREO */}
          <div className="mb-4">
            <label className="form-label" style={{ color: '#999', fontSize: '14px' }}>Correo:</label>
            <input 
              type="email" 
              name="correo" 
              value={data.correo || ""} 
              className="form-control" 
              style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
              onChange={handleChange} 
              required 
            />
          </div>

          {/* CONTRASEÑA (SOLO PARA REGISTRO NUEVO) */}
          {!edit && (
            <div className="mb-5">
              <label className="form-label" style={{ color: '#999', fontSize: '14px' }}>Contraseña:</label>
              <input 
                type="password" 
                name="password" 
                value={data.password || ""} 
                className="form-control" 
                style={{ backgroundColor: '#f2f2f2', border: 'none', height: '45px' }}
                onChange={handleChange} 
                required 
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-dark w-100 py-3 text-uppercase" 
            style={{ backgroundColor: '#1a1a1a', border: 'none', letterSpacing: '2px', fontSize: '14px' }}
          >
            {edit ? 'Actualizar' : 'Registrar Empleado'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalActions;