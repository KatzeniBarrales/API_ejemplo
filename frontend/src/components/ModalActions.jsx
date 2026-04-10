import React, {useState, useEffect} from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from 'react-responsive-modal';

const ModalActions = ({open,onCloseModal,getEmployees,edit,employee}) => {
    const initialState = {
        nombres:"",
        apellidos:"",
        id:"",
        correo:"",
        tcontrato:"Fijo"
    }

const [dataEmployee, setDataEmployee]=useState(initialState);
const tcontratos=["Fijo","Temporal","Practicante"];

const handleChange=(e)=>{
      setDataEmployee({...dataEmployee,[e.target.name]:e.target.value});
}

 useEffect(()=>{
    edit ? setDataEmployee(employee):setDataEmployee(initialState);
    //eslint-disable-next-line
  },[edit,employee]);

const saveEmployee= async(e)=>{
    try {
      //e.preventDefault();
      const { data } = await axios.post("/empleado",dataEmployee);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getEmployees();
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función saveEmployee',error.message);
    }
  };

  const updateEmployee= async(e)=>{
    try {
      //e.preventDefault();
      const { data } = await axios.put(`/empleado/update/${employee._id}`,dataEmployee);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getEmployees();
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función updateEmployee',error.message);
    }
  };

  const actions=(e)=>{
    e.preventDefault();
    edit ? updateEmployee() : saveEmployee();
  }

  return (
    <div>
    <Modal open={open} onClose={onCloseModal} center>
        <div className='card'>
          <div className='card-header'>
            <h5>{ edit ? 'Actualizar empleado' : 'Agregar empleado'}</h5>
          </div>{/*card-header*/}
          <div className='card-body'>
            <form onSubmit={actions}>
              <div className='mb-3'>
                <label className='form-label'>Nombres:</label>
                <input type="text" className='form-control'
                  name="nombres" required autoFocus
                  onChange={(e)=>handleChange(e)}
                  value={dataEmployee.nombres}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Apellidos:</label>
                <input type="text" className='form-control' name="apellidos" 
                  required
                  onChange={(e)=>handleChange(e)}
                  value={dataEmployee.apellidos}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Correo:</label>
                <input type="text" className='form-control' name="correo" 
                  required
                  onChange={(e)=>handleChange(e)}
                  value={dataEmployee.correo}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Identificación:</label>
                <input type="text" className='form-control'
                  name="id" required
                  onChange={(e)=>handleChange(e)}
                  value={dataEmployee.id}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Tipo de contrato:</label>
                <select name="tcontrato" className='form-select'
                onChange={(e)=>handleChange(e)}
                value={dataEmployee.tcontrato}>
                  {
                    tcontratos.map((item)=>(
                      <option key={item} value={item}>{item}</option>
                    ))
                  }
                </select>
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <button type="submit" className='btn btn-primary form-control'>
                  {edit ? 'Actualizar' : 'Guardar'}
                </button>
              </div>{/*mb-3*/}
            </form>
          </div>{/*card-body */}
        </div>{/*card*/}
      </Modal>
    </div>
  )
}

export default ModalActions