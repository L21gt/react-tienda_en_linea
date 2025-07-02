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


-------------------------------------------

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
