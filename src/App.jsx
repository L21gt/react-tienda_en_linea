import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

import Login from './Login';
import OrdenesUsuario from './OrdenesUsuario'; // Importar el nuevo componente
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [vistaActual, setVistaActual] = useState('catalogo'); // Nuevo estado para controlar la vista

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserEmail = localStorage.getItem('userEmail');

    if (storedUserId && storedUserEmail) {
      setUserId(storedUserId);
      setUserEmail(storedUserEmail);
      setIsLoggedIn(true);
      // Cargar productos si ya hay un usuario logueado
      obtenerProductos();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Solo obtener productos si el usuario está logueado y aún no se han cargado
    // y si la vista actual es 'catalogo'
    if (isLoggedIn && productos.length === 0 && !loading && vistaActual === 'catalogo') {
      obtenerProductos();
    }
  }, [isLoggedIn, productos.length, loading, vistaActual]); // Dependencias para este efecto

  const obtenerProductos = async () => {
    try {
      setLoading(true);
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

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      let currentUserId = null;
      let currentUserEmail = email;

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0];
        currentUserId = userData.id;
        console.log("Usuario existente, ID: ", currentUserId);
      } else {
        const newUserDoc = await addDoc(usuariosRef, { email: email });
        currentUserId = newUserDoc.id;
        console.log("Nuevo usuario creado, ID: ", currentUserId);
      }

      localStorage.setItem('userId', currentUserId);
      localStorage.setItem('userEmail', currentUserEmail);

      setUserId(currentUserId);
      setUserEmail(currentUserEmail);
      setIsLoggedIn(true);
      setLoading(false);
      setVistaActual('catalogo'); // Redirige al catálogo después del login
      obtenerProductos(); // Cargar productos al iniciar sesión
    } catch (e) {
      setError('Error en el inicio de sesión: ' + e.message);
      setLoading(false);
      console.error("Error al iniciar sesión: ", e);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setUserId(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    setProductos([]); // Limpia los productos al cerrar sesión
    setCarrito([]); // Limpia el carrito al cerrar sesión
    setVistaActual('catalogo'); // Vuelve al login o catálogo vacío
  };


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

  const ingresarOrden = async () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de ingresar una orden.');
      return;
    }

    if (!userId) {
      alert('Debes iniciar sesión para ingresar una orden.');
      return;
    }

    const confirmacion = window.confirm('¿Estás seguro de que quieres ingresar esta orden?');
    if (confirmacion) {
      try {
        const orden = {
          productos: JSON.stringify(carrito),
          idUsuario: userId,
          total: totalCarrito.toFixed(2),
          fecha: new Date(),
        };

        const docRef = await addDoc(collection(db, 'ordenes'), orden);
        console.log("Documento de orden escrito con ID: ", docRef.id);

        alert('¡Orden ingresada con éxito! ID de la orden: ' + docRef.id);
        setCarrito([]);

      } catch (e) {
        console.error("Error al agregar documento: ", e);
        alert('Error al ingresar la orden. Por favor, inténtalo de nuevo.');
      }
    }
  };

  if (loading && !isLoggedIn) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Renderizado de la aplicación principal cuando el usuario está logueado
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="main-title">Mini Tienda en Línea</h1>
        <div className="user-info">
          <span>Bienvenido: {userEmail}</span>
          <button className="view-orders-btn" onClick={() => setVistaActual('ordenes')}>
            Ver Mis Órdenes
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {vistaActual === 'catalogo' ? (
        <>
          <h2 className="section-title">Catálogo de Productos</h2>
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
                <button
                  className="ingresar-orden-btn"
                  onClick={ingresarOrden}
                >
                  Ingresar Orden
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        // Si vistaActual es 'ordenes', mostrar el componente OrdenesUsuario
        <>
          <button className="back-to-catalog-btn" onClick={() => setVistaActual('catalogo')}>
            ← Volver al Catálogo
          </button>
          <OrdenesUsuario userId={userId} />
        </>
      )}
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