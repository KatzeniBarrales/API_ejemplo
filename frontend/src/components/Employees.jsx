import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import Swal from "sweetalert2";
import axios from 'axios';
import ModalActions from './ModalActions';

const Employees = () => {
  const { user } = useUser();
  const [empleados, setEmpleados] = useState([]);

  // ESTADO ACTUALIZADO CON CAMPOS DE REGISTER
  const initialState = {
    name: "",      // Antes nombres
    correo: "",
    nivel: "",     // Nuevo
    password: ""   // Nuevo
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
        await axios.post("/usuario/register", data); // Usamos la ruta de registro
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
    // Para editar cargamos el item, para nuevo usamos initialState
    setData(isEdit ? item : initialState);
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setData(initialState);
  };

  return (
    <div>
      <nav className='navbar py-4 shadow-sm bg-white mb-4'>
        <div className='container'>
          <div className='col-md-3'>
            <button className='btn btn-dark text-uppercase' onClick={() => onOpenModal(false)}>
              <i className='fas fa-plus me-2'></i> Add empleado
            </button>
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='input-group'>
              <input type="search" className='form-control bg-light border-0'
                placeholder='Buscar por nombre...'
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className='container'>
          <div className='card border-0 shadow-sm'>
            <div className='card-header bg-dark text-white py-3'>
              <h4 className='mb-0 text-uppercase' style={{fontSize: '16px', letterSpacing: '1px'}}>
                Empleados de {user.name}
              </h4>
            </div>
            <div className='table-responsive'>
              <table className='table table-hover mb-0'>
                <thead className='table-light'>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Nivel</th>
                    <th className='text-center'>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((item, i) => (
                    <tr key={item._id} className='align-middle'>
                      <td>{i + 1}</td>
                      <td className='fw-bold'>{item.name}</td>
                      <td>{item.correo}</td>
                      <td>
                        <span className={`badge ${item.nivel === '1' ? 'bg-dark' : 'bg-secondary'}`}>
                          {item.nivel === '1' ? 'Admin' : 'Empleado'}
                        </span>
                      </td>
                      <td className='text-center'>
                        <button className='btn btn-sm btn-outline-warning me-2' onClick={() => onOpenModal(true, item)}>
                          <i className='fas fa-edit'></i>
                        </button>
                        <button className='btn btn-sm btn-outline-danger' onClick={() => deleteEmployee(item._id)}>
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