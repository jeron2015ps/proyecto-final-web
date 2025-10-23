import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmarPassword: '',
    telefono: '',
    documento: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Guardar usuario en localStorage (simulado)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push({
      id: Date.now(),
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      password: formData.password,
      telefono: formData.telefono,
      documento: formData.documento,
      saldo: 0,
      numeroCuenta: `001-${Math.floor(Math.random() * 1000000)}`
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso. Ahora puedes iniciar sesión');
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: '600px' }}>
        <div className="login-header">
          <h1>🏦 Estebanquito</h1>
          <p>Crear Nueva Cuenta</p>
        </div>

        <form onSubmit={manejarEnvio} className="login-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={manejarCambio}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Documento de Identidad</label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmarPassword"
                value={formData.confirmarPassword}
                onChange={manejarCambio}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            Registrarse
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <p>¿Ya tienes cuenta? <a href="/" style={{ color: '#667eea', fontWeight: 'bold' }}>Inicia Sesión</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
