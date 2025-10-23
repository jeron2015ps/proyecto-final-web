import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');
    
    const resultado = iniciarSesion(email, password);
    if (resultado.exito) {
      navigate('/dashboard');
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🏦 Banco Digital</h1>
          <p>Ingresa a tu cuenta</p>
        </div>

        <form onSubmit={manejarEnvio} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@banco.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>

          <div className="demo-credentials">
            <p><strong>Credenciales de prueba:</strong></p>
            <p>Email: usuario@banco.com</p>
            <p>Contraseña: 123456</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
