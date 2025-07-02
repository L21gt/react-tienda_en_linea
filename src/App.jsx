import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Importamos addDoc
import { db } from './firebaseConfig';

import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Simulación de ID de usuario (Esto cambiará en la fase de Login)
  const userId = 'usuario_invitado_123'; // ID temporal para probar

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosCollection = collection(db, 'productos');
        const productosSnapshot = await getDocs(productosCollection);
        const productosList = productosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosList);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos: ' + err.message);
        setLoading(false);
        console.error("Error al obtener documentos: ", err);
      }
    };

    obtenerProductos();
  }, []);

  const agregarAlCarrito = (producto, cantidad) => {
    if (cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0 para agregar al carrito.');
      return;
    }

    setCarrito(prevCarrito => {
      const productoExistenteIndex = prevCarrito.findIndex(item => item.id === producto.id);

      if (productoExistenteIndex > -1) {
        const nuevoCarrito = [...prevCarrito];
        nuevoCarrito[productoExistenteIndex].cantidad += cantidad;
        return nuevoCarrito;
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
  };

  const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // --- NUEVA FUNCIÓN: Ingresar Orden ---
  const ingresarOrden = async () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de ingresar una orden.');
      return;
    }

    const confirmacion = window.confirm('¿Estás seguro de que quieres ingresar esta orden?');
    if (confirmacion) {
      try {
        // Prepara los datos de la orden
        const orden = {
          productos: JSON.stringify(carrito), // Convierte el array de productos a string
          idUsuario: userId, // Usamos el ID temporal por ahora
          total: totalCarrito.toFixed(2), // Guarda el total
          fecha: new Date(), // Guarda la fecha y hora actual
        };

        // Agrega la orden a la colección 'ordenes' en Firestore
        const docRef = await addDoc(collection(db, 'ordenes'), orden);
        console.log("Documento de orden escrito con ID: ", docRef.id);

        alert('¡Orden ingresada con éxito! ID de la orden: ' + docRef.id);
        setCarrito([]); // Vacía el carrito después de ingresar la orden

      } catch (e) {
        console.error("Error al agregar documento: ", e);
        alert('Error al ingresar la orden. Por favor, inténtalo de nuevo.');
      }
    }
  };
  // --- FIN NUEVA FUNCIÓN ---


  if (loading) {
    return <div className="loading-message">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app-container">
      <h1 className="title">Catálogo de Productos</h1>
      <div className="productos-grid">
        {productos.map(producto => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      <div className="carrito-container">
        <h2 className="carrito-title">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="carrito-vacio-mensaje">Tu carrito está vacío.</p>
        ) : (
          <>
            <table className="carrito-tabla">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map(item => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>Q{item.precio.toFixed(2)}</td>
                    <td>{item.cantidad}</td>
                    <td>Q{(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button
                        className="eliminar-btn"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="total-carrito">Total: Q{totalCarrito.toFixed(2)}</h3>
            {/* Botón para ingresar la orden */}
            <button
              className="ingresar-orden-btn"
              onClick={ingresarOrden}
            >
              Ingresar Orden
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ProductoCard({ producto, agregarAlCarrito }) {
  const [cantidad, setCantidad] = useState(1);

  const handleAgregarClick = () => {
    agregarAlCarrito(producto, cantidad);
    setCantidad(1);
  };

  return (
    <div className="producto-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>Q{producto.precio.toFixed(2)}</p>
      <div className="cantidad-control">
        <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
        <input
          type="number"
          id={`cantidad-${producto.id}`}
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
        />
      </div>
      <button className="agregar-carrito-btn" onClick={handleAgregarClick}>
        Agregar al Carrito
      </button>
    </div>
  );
}

export default App;