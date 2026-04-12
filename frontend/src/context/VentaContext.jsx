import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "./UserContext"; // Importamos el contexto de usuario

import { createContext, useState, useContext, useEffect, useCallback } from "react";

const VentaContext = createContext();

export const VentaProvider = (props) => {
  const { user } = useUser();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener todas las ventas (ListAllVentas)
// Asegúrate de importar useCallback arriba
const getVentas = useCallback(async () => {
  if (!user.token) return; // No pidas nada si no hay sesión

  try {
    setLoading(true);
    // Usamos el token en los headers para que el backend te deje pasar
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { data } = await axios.get('http://localhost:4000/api/venta', config);
    
    if (data.ok) {
      setVentas(data.data);
    }
  } catch (error) {
    console.log('Error al obtener ventas:', error.message);
  } finally {
    setLoading(false);
  }
}, [user.token]); // La función solo cambia si el token cambia

  // Función para eliminar una venta
  const deleteVenta = async (id) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(`http://localhost:4000/api/venta/delete/${id}`);
          if (data.ok) {
            Swal.fire('Eliminado', data.message, 'success');
            getVentas(); // Recargamos la lista
          }
        }
      });
    } catch (error) {
      console.log('Error al eliminar venta:', error.message);
    }
  };

  // Función para buscar por nombre de cliente
  const searchVenta = async (nombre) => {
    try {
      if (nombre === "") return getVentas(); // Si está vacío, traer todas
      const { data } = await axios.get(`http://localhost:4000/api/venta/buscar/${nombre}`);
      if (data.ok) {
        setVentas(data.data);
      }
    } catch (error) {
      console.log('Error en la búsqueda:', error.message);
    }
  };

// VentaContext.jsx
useEffect(() => {
    if (user.login) {
        getVentas();
    } else {
        setVentas([]); // Limpia la tabla al cerrar sesión
    }
}, [user.login, getVentas]); // Se dispara cuando el login cambia

  const value = {
    ventas,
    getVentas,
    deleteVenta,
    searchVenta,
    loading
  };

  return <VentaContext.Provider value={value} {...props} />;
};

// Al final de VentaContext.jsx
export const useVenta = () => {
    return useContext(VentaContext);
};

// Asegúrate de que esta línea exista si usas export default
export default VentaProvider;