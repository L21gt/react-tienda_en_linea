Luis Velasquez  
Carnet 24011341  
Curso React fundamentos  
3er semestre - Proyecto Final - Mini Tienda en linea  

# Proyecto Final: Mini Tienda en Línea

## Descripción:
El proyecto consiste en desarrollar una tienda en línea básica utilizando los fundamentos de React. A través de esta actividad, se aplicarán los conocimientos adquiridos durante el curso para construir una aplicación interactiva que simule un flujo de compra en línea.

## Requisitos del proyecto:

### 1.  Vista de Catálogo de Productos:
- Mostrar una lista de productos, incluyendo imagen (usar cualquier URL de imagen de internet), nombre y precio. Puedes elegir cuántos productos mostrar; no es requerido que sean muchos.

- Permitir seleccionar la cantidad de cada producto mediante un campo numérico.

- Los productos deben estar ingresados previamente en una colección de Firestore. Estos productos serán los mismos para todos los usuarios.

### 2. Carrito de Compras:

- Agregar productos seleccionados al carrito con su respectiva cantidad. Calcular automáticamente el subtotal por producto y el total general.

- Incluir un botón para "Ingresar orden". Al hacer clic, mostrar un mensaje de confirmación y este pedido se incluirá en una colección de Firestore.

- Para registrar la orden, se debe guardar la lista de productos ingresados en una nueva colección llamada ordenes. Esta colección tendrá un campo con la lista de productos como string usando la función JSON.stringify de JavaScript, y otro campo con el ID del usuario que ingresó el pedido.

### 3. Vista para Visualizar Órdenes Ingresadas:

- Se debe crear una vista donde se mostrarán todas las órdenes ingresadas por el usuario. Esta es la información guardada en la colección de órdenes. Debes tomar en cuenta que el string de la lista de productos debe convertirse nuevamente en un arreglo usando la función JSON.parse. El ID de usuario se debe obtener del valor guardado previamente en local storage al iniciar sesión.

- Se debe mostrar el nombre del producto, la imagen del producto y el precio individual de cada producto. También, mostrar el total de todos los productos ingresados por orden generada.

### 4. Ingreso de Usuario (Login):

- Se deberá crear una vista para que los usuarios puedan ingresar a la aplicación. El usuario deberá ingresar su correo electrónico en un campo y presionar un botón para entrar.

- Debes crear una colección llamada usuarios en Firestore para almacenar los usuarios de la aplicación.

- Si al ingresar, el correo ya existe en la colección de usuarios de Firebase, se deberá redirigir a la página de productos, guardando el ID obtenido en local storage para luego utilizarlo al ingresar el pedido.

- Si el usuario no existe en la colección usuarios, se deberá ingresar el correo a la colección de usuarios para luego redirigirlo a la página de productos. Esto con la finalidad de obtener el ID del documento del usuario para poder identificar los productos que ha agregado a su pedido.

- Si el usuario ya tiene almacenado un valor en local storage porque ya había ingresado previamente, deberá mostrar automáticamente la vista de productos.

### 5. Diseño de la Interfaz:

El diseño de la interfaz de la aplicación queda a tu discreción. Solamente se debe tomar en cuenta que existan todas las vistas requeridas. No es requerido un diseño complejo, solamente que se puedan visualizar correctamente los requerimientos del proyecto.

---------------------------------------------------------------------------------------------

# Mini Tienda en Línea - Proyecto Final de React Fundamentos

Este es el proyecto final para el curso de React Fundamentos, que consiste en el desarrollo de una aplicación web de mini tienda en línea básica. La aplicación permite a los usuarios:

* Visualizar un catálogo de productos obtenidos de Firestore.
* Seleccionar productos y agregarlos a un carrito de compras.
* Calcular subtotales por producto y un total general del carrito.
* Ingresar órdenes, las cuales son almacenadas en Firestore.
* Gestionar usuarios mediante un sistema de login/registro (creación de usuario si no existe, o inicio de sesión si ya existe).
* Visualizar un historial de órdenes ingresadas por el usuario.

## Tecnologías Utilizadas

* **Frontend:** React (con Vite)
* **Lenguaje:** JavaScript
* **Base de Datos:** Google Firestore (Firebase)
* **Herramientas de Desarrollo:** Visual Studio Code, Node.js

## Configuración de Firestore

El proyecto utiliza Google Firestore para almacenar los datos de productos, usuarios y órdenes. Se configuran las siguientes colecciones:

* `productos`: Almacena la información de los productos disponibles en la tienda (nombre, precio, imagen, cantidadDisponible).
* `usuarios`: Guarda los correos electrónicos de los usuarios que han iniciado sesión o se han registrado.
* `ordenes`: Contiene los pedidos realizados por los usuarios, incluyendo el ID del usuario y una cadena JSON con los detalles de los productos de la orden.

Captura de pantalla de las colecciones de Firestore → `public/Firebase.png`


## Instrucciones para Ejecutar el Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/L21gt/react-tienda_en_linea.git
    cd mi-tienda
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Firebase:**
    * Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
    * Configura una aplicación web y copia tu objeto `firebaseConfig`.
    * Habilita "Firestore Database" en modo de prueba.
    * Crea un archivo `src/firebaseConfig.js` con tu configuración:
        ```javascript
        // src/firebaseConfig.js
        import { initializeApp } from "firebase/app";
        import { getFirestore } from "firebase/firestore";
        // Importa getAnalytics si lo habilitaste
        // import { getAnalytics } from "firebase/analytics";

        const firebaseConfig = {
          apiKey: "TU_API_KEY",
          authDomain: "TU_AUTH_DOMAIN",
          projectId: "TU_PROJECT_ID",
          storageBucket: "TU_STORAGE_BUCKET",
          messagingSenderId: "TU_MESSAGING_SENDER_ID",
          appId: "TU_APP_ID",
          // measurementId: "TU_MEASUREMENT_ID"
        };

        const app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app); // Si lo usas
        const db = getFirestore(app);

        export { db };
        ```
    * Asegúrate de haber creado al menos 3-5 productos de ejemplo en la colección `productos` de Firestore.

4.  **Ejecutar la aplicación:**
    ```bash
    npm run dev
    ```
    La aplicación se abrirá en tu navegador (normalmente `http://localhost:5173/`).

---------------------------------------------------------------------------------------------


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
