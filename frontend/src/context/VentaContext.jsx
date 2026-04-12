import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "./UserContext";

const VentaContext = createContext();

export const VentaProvider = ({ children }) => {
  const { user } = useUser();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Definimos getVentas con useCallback para evitar el bucle infinito
  const getVentas = useCallback(async () => {
    // Verificamos que exista el token antes de disparar la petición
    if (!user || !user.token) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get('http://localhost:4000/api/venta', config);

      if (data.ok) {
        setVentas(data.data);
      }
    } catch (error) {
      console.error('Error al obtener ventas:', error.message);
    } finally {
      setLoading(false);
    }
  }, [user?.token]); // Solo se recrea si el token cambia

  // 2. Efecto para cargar ventas al iniciar sesión o limpiar al salir
  useEffect(() => {
    if (user?.login) {
      getVentas();
    } else {
      setVentas([]);
    }
  }, [user?.login, getVentas]);

  const deleteVenta = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      });

      if (result.isConfirmed) {
        const { data } = await axios.delete(`http://localhost:4000/api/venta/delete/${id}`);
        if (data.ok) {
          Swal.fire('Eliminado', data.message, 'success');
          getVentas();
        }
      }
    } catch (error) {
      console.error('Error al eliminar venta:', error.message);
    }
  };

  const searchVenta = async (nombre) => {
    try {
      // Si el input está vacío, regresamos a la lista completa
      if (!nombre || nombre.trim() === "") {
        return getVentas();
      }

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      const { data } = await axios.get(
        `http://localhost:4000/api/venta/search/${nombre}`,
        config
      );

      if (data.ok) {
        // Asegúrate de que el backend mande los datos en data.data
        setVentas(data.data);
      } else {
        setVentas([]); // Si no hay éxito, limpiamos la tabla
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error.message);
      setVentas([]); // Si hay error (como un 404), mostramos la tabla vacía
    }
  };

  const value = {
    ventas,
    getVentas,
    deleteVenta,
    searchVenta,
    loading
  };

  return <VentaContext.Provider value={value}>{children}</VentaContext.Provider>;
};

export const useVenta = () => useContext(VentaContext);

export default VentaProvider;