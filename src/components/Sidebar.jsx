import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { cerrarSesion, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  const esRutaActiva = (ruta) => {
    return location.pathname === ruta;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🏦 Estebanquito</h2>
        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '5px' }}>
          {usuario?.nombre} {usuario?.apellido}
        </p>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${esRutaActiva('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <span className="nav-icon">🏠</span>
          Mi Cuenta
        </button>
        <button 
          className={`nav-item ${esRutaActiva('/transacciones') ? 'active' : ''}`}
          onClick={() => navigate('/transacciones')}
        >
          <span className="nav-icon">💸</span>
          Transacciones
        </button>
        <button 
          className={`nav-item ${esRutaActiva('/prestamos') ? 'active' : ''}`}
          onClick={() => navigate('/prestamos')}
        >
          <span className="nav-icon">💳</span>
          Préstamos
        </button>
        <button 
          className={`nav-item ${esRutaActiva('/reportes') ? 'active' : ''}`}
          onClick={() => navigate('/reportes')}
        >
          <span className="nav-icon">📈</span>
          Reportes
        </button>
      </nav>

      <button onClick={manejarCerrarSesion} className="nav-item logout">
        <span className="nav-icon">🚪</span>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Sidebar;
