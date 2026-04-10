import React, {useState,useEffect,useCallback} from 'react'
import { useUser } from '../context/UserContext';
import Swal from "sweetalert2";
import axios from 'axios';
import ModalActions from './ModalActions';

const Employees = () => {
  const { user } = useUser();
  const [empleados,setEmpleados] = useState([]);

  const getEmployees= useCallback (async()=>{
        try {
            const { data } = await axios.get("/empleado/listboss",
            {

            });
        //console.log(data);
        setEmpleados(data.data);
        } catch (error) {
            if(!error.response.data.ok){
                return Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                    });
            }
            console.log('error en la función getEmployees ',error.message);
        }
    },[]);

    useEffect(()=>{
      getEmployees()
    },[getEmployees]);

    const search = async (value) => {
    try {
         if (value === "") {
           return getEmployees();
         }
         const { data } = await axios.get(`/empleado/search/${value}`);
         //console.log(data);
         setEmpleados(data.data);
       } catch (error) {
         console.log("error en search", error.message);
       }
  };
const deleteEmployee = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
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

//Manejo de ventana modal
const [employee, setEmployee] = useState (false);
const [edit, setEdit] = useState (false);
const [open, setOpen] = useState(false);
const onOpenModal = (edit, employee) =>{
setOpen(true); 
setEdit(edit);
setEmployee(employee);
}  
const onCloseModal = () => setOpen(false);

  return (
    <div>
      <nav className='navbar py-4'>
        <div className='container'>
          <div className='col-md-3'>
            <button className='btn btn-primary' onClick={()=>onOpenModal(false, {})}>
              <i className='fas fa-plus'></i> Add empleado
            </button>
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='input-group'>
              <input type="search" className='form-control'
                placeholder='Search...'
                aria-label='search' required
                onChange={(e)=>search(e.target.value)}
                />
            </div>{/*input-group*/}
          </div>{/*col-md-6*/}
        </div>{/*container*/}
      </nav>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Empleados de {user.name}</h4>
                </div>{/*card-header*/}
                <div className='table-responsive-lg'>
                  <table className='table table-striped'>
                    <thead className='table-dark'>
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Correo</th>
                        <th>Identificación</th>
                        <th>Contrato</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        empleados.map((item,i)=>(
                          <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>{item.nombres}</td>
                            <td>{item.correo}</td>
                            <td>{item.id}</td>
                            <td>{item.tcontrato}</td>
                            <td>
                              <button className='btn btn-danger'
                              onClick={()=>deleteEmployee(item._id)}>
                                <i className='fas fa-trash'></i>
                              </button>
                              <button className='btn btn-warning'onClick={()=>onOpenModal(true, item)}>
                                <i className='fas fa-edit'></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>{/*table-resposive-lg*/}
              </div>{/*card*/}
            </div>{/*col-md-12*/}
          </div>{/*row*/}
        </div>{/*container*/}
      </section>
      <ModalActions open={open} 
      onCloseModal={onCloseModal} 
      getEmployees={getEmployees} 
      edit={edit}
      employee={employee}/>
    </div>/*return*/
  )
}

export default Employees