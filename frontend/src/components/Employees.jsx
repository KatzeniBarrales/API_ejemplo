import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import Swal from "sweetalert2";
import axios from 'axios';
import ModalActions from './ModalActions';

const Employees = () => {
  const { user } = useUser();
  const [empleados, setEmpleados] = useState([]);

  const initialState = {
    name: "",
    correo: "",
    nivel: "2", // Por defecto nivel 2 para nuevos
    password: ""
  };

  const [data, setData] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const getEmployees = useCallback(async () => {
    try {
      const { data } = await axios.get("/empleado/listboss");
      setEmpleados(data.data);
    } catch (error) {
      console.log('error en la función getEmployees ', error.message);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  const search = async (value) => {
    try {
      if (value === "") return getEmployees();
      const { data } = await axios.get(`/empleado/search/${value}`);
      setEmpleados(data.data);
    } catch (error) {
      console.log("error en search", error.message);
    }
  };

  const deleteEmployee = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¡Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a1a1a",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete("/empleado/delete/" + id);
        getEmployees();
        Swal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const saveEmpleado = async () => {
    try {
      if (edit) {
        await axios.put("/empleado/update/" + data._id, data);
      } else {
        await axios.post("/usuario/register", data);
      }
      onCloseModal();
      getEmployees();
      Swal.fire({
        icon: 'success',
        title: edit ? 'Actualizado' : 'Registrado',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onOpenModal = (isEdit, item) => {
    setEdit(isEdit);
    setData(isEdit ? item : initialState);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setData(initialState);
  };

  return (
    /* CONTENEDOR PRINCIPAL CON COLOR AZUL PASTEL MUY SUAVE */
    <div style={{ backgroundColor: '#a2bcd6', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* NAVBAR CON FONTO BLANCO PARA QUE RESALTE SOBRE EL FONDO CLARO */}
      <nav className='navbar py-4 shadow-sm bg-white mb-5'>
        <div className='container'>
          <div className='col-md-3'>
            <button className='btn btn-dark text-uppercase shadow-sm' 
              style={{ letterSpacing: '1px', borderRadius: '4px' }}
              onClick={() => onOpenModal(false)}>
              <i className='fas fa-plus me-2'></i> Add empleado
            </button>
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='input-group shadow-sm'>
              <input type="search" className='form-control border-0'
                placeholder='Buscar por nombre...'
                style={{ height: '45px', paddingLeft: '20px' }}
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className='container'>
          {/* LA CARD BLANCA SE VE INCREÍBLE SOBRE EL FONDO AZUL PASTEL */}
          <div className='card border-0 shadow-lg' style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <div className='card-header bg-dark text-white py-4 border-0 text-center'>
              <h4 className='mb-0 text-uppercase' style={{ fontSize: '14px', letterSpacing: '3px', fontWeight: '300' }}>
                Panel de Gestión: Empleados de {user.name}
              </h4>
            </div>
            
            <div className='table-responsive p-3'>
              <table className='table table-hover mb-0'>
                <thead style={{ borderBottom: '2px solid #f0f4f8' }}>
                  <tr className='text-muted' style={{ fontSize: '12px', letterSpacing: '1px' }}>
                    <th className='py-3'>#</th>
                    <th className='py-3 text-uppercase'>Nombre</th>
                    <th className='py-3 text-uppercase'>Correo</th>
                    <th className='py-3 text-uppercase'>Nivel</th>
                    <th className='py-3 text-center text-uppercase'>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((item, i) => (
                    <tr key={item._id} className='align-middle'>
                      <td className='text-muted'>{i + 1}</td>
                      <td className='fw-bold' style={{ color: '#2c3e50' }}>{item.name}</td>
                      <td style={{ color: '#7f8c8d' }}>{item.correo}</td>
                      <td>
                        <span className={`badge rounded-pill ${item.nivel === '1' ? 'bg-dark' : 'bg-primary'}`} 
                          style={{ fontSize: '10px', padding: '6px 12px', fontWeight: '400' }}>
                          {item.nivel === '1' ? 'ADMIN' : 'EMPLEADO'}
                        </span>
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-link text-warning p-2 me-2' onClick={() => onOpenModal(true, item)}>
                          <i className='fas fa-edit'></i>
                        </button>
                        <button className='btn btn-link text-danger p-2' onClick={() => deleteEmployee(item._id)}>
                          <i className='fas fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <ModalActions 
        open={open} 
        onCloseModal={onCloseModal} 
        data={data} 
        setData={setData} 
        save={saveEmpleado}
        edit={edit} 
      />
    </div>
  );
};

export default Employees;