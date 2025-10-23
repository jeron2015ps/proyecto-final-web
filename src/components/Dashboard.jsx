import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './Sidebar.jsx';
import ListaTransacciones from './ListaTransacciones.jsx';

const Dashboard = () => {
  const { usuario } = useAuth();

  const transacciones = JSON.parse(localStorage.getItem('transacciones') || '[]')
    .filter(t => t.usuarioId === usuario?.id);

  const ingresos = transacciones
    .filter(t => t.tipo === 'deposito')
    .reduce((sum, t) => sum + t.monto, 0);

  const egresos = transacciones
    .filter(t => t.tipo === 'retiro' || t.tipo === 'transferencia')
    .reduce((sum, t) => sum + t.monto, 0);

  const saldoActual = ingresos - egresos;

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Mi Cuenta</h1>
          <p>Gestión de cuenta bancaria</p>
        </div>

        <div className="dashboard-grid">
          {/* Saldo */}
          <div className="stat-card" style={{ gridColumn: 'span 2' }}>
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <p className="stat-label">Saldo Actual</p>
              <p className="stat-valor" style={{ fontSize: '2rem' }}>
                ${saldoActual.toLocaleString('es-CO')}
              </p>
            </div>
          </div>

          {/* Información de la cuenta */}
          <div className="cuenta-info" style={{ gridColumn: 'span 2' }}>
            <h3>Detalles de la Cuenta</h3>
            <div className="info-item">
              <span className="info-label">Número de Cuenta:</span>
              <span className="info-valor">{usuario?.numeroCuenta}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tipo de Cuenta:</span>
              <span className="info-valor">Ahorros</span>
            </div>
            <div className="info-item">
              <span className="info-label">Estado:</span>
              <span className="info-valor activo">Activa</span>
            </div>
          </div>

          {/* Perfil del usuario */}
          <div className="cuenta-info" style={{ gridColumn: 'span 2' }}>
            <h3>Perfil de Usuario</h3>
            <div className="info-item">
              <span className="info-label">Nombre Completo:</span>
              <span className="info-valor">{usuario?.nombre} {usuario?.apellido}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Documento:</span>
              <span className="info-valor">{usuario?.documento}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-valor">{usuario?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span className="info-valor">{usuario?.telefono}</span>
            </div>
          </div>

          {/* Transacciones recientes */}
          <ListaTransacciones />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
