import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (email.trim() === '') {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }
    onLogin(email); // Llama a la función onLogin pasada desde App.jsx
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Ingreso de Usuario</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;