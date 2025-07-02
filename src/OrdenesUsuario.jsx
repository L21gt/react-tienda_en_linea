import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './App.css'; // Estilos generales

function OrdenesUsuario({ userId }) {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerOrdenes = async () => {
      if (!userId) {
        setError('ID de usuario no disponible. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'ordenes'), where('idUsuario', '==', userId));
        const querySnapshot = await getDocs(q);
        const ordenesList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Parsear el string de productos a un objeto/array
            productos: JSON.parse(data.productos)
          };
        });
        setOrdenes(ordenesList);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las órdenes: ' + err.message);
        setLoading(false);
        console.error("Error al obtener órdenes: ", err);
      }
    };

    obtenerOrdenes();
  }, [userId]); // Se ejecuta cada vez que userId cambia

  if (loading) {
    return <div className="loading-message">Cargando tus órdenes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="ordenes-container">
      <h2 className="ordenes-title">Mis Órdenes</h2>
      {ordenes.length === 0 ? (
        <p className="no-ordenes-mensaje">No tienes órdenes ingresadas aún.</p>
      ) : (
        ordenes.map(orden => (
          <div key={orden.id} className="orden-card">
            <p><strong>ID de Orden:</strong> {orden.id}</p>
            <p><strong>Fecha:</strong> {new Date(orden.fecha.seconds * 1000).toLocaleString()}</p> {/* Formatear la fecha */}
            <p><strong>Total de la Orden:</strong> Q{orden.total}</p>
            <h4 className="productos-en-orden-title">Productos:</h4>
            <div className="productos-en-orden-grid">
              {orden.productos.map(producto => (
                <div key={producto.id} className="producto-en-orden-item">
                  <img src={producto.imagen} alt={producto.nombre} className="producto-en-orden-img" />
                  <p className="producto-en-orden-nombre">{producto.nombre}</p>
                  <p className="producto-en-orden-precio">Q{producto.precio.toFixed(2)} x {producto.cantidad}</p>
                  <p className="producto-en-orden-subtotal">Subtotal: Q{(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdenesUsuario;