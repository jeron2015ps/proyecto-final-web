import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './Sidebar.jsx';

const Reportes = () => {
  const { usuario } = useAuth();

  // Calcular reportes
  const transacciones = JSON.parse(localStorage.getItem('transacciones') || '[]')
    .filter(t => t.usuarioId === usuario?.id);

  const ingresosTotales = transacciones
    .filter(t => t.tipo === 'deposito')
    .reduce((sum, t) => sum + t.monto, 0);

  const egresosTotales = transacciones
    .filter(t => t.tipo === 'retiro' || t.tipo === 'transferencia')
    .reduce((sum, t) => sum + t.monto, 0);

  const prestamos = JSON.parse(localStorage.getItem('prestamos') || '[]')
    .filter(p => p.usuarioId === usuario?.id);

  const deudasTotales = prestamos
    .reduce((sum, p) => sum + p.montoPendiente, 0);

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Reportes Financieros</h1>
          <p>Resumen histórico de tu actividad financiera</p>
        </div>

        <div className="dashboard-grid">
          {/* Tarjetas de reportes */}
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <p className="stat-label">Ingresos Totales Históricos</p>
              <p className="stat-valor ingreso">
                +${ingresosTotales.toLocaleString('es-CO')}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📉</div>
            <div className="stat-info">
              <p className="stat-label">Egresos Totales Históricos</p>
              <p className="stat-valor egreso">
                -${egresosTotales.toLocaleString('es-CO')}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💳</div>
            <div className="stat-info">
              <p className="stat-label">Deudas Pendientes</p>
              <p className="stat-valor" style={{ color: deudasTotales > 0 ? '#ef4444' : '#10b981' }}>
                ${deudasTotales.toLocaleString('es-CO')}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <p className="stat-label">Balance Neto</p>
              <p className="stat-valor" style={{ color: (ingresosTotales - egresosTotales) >= 0 ? '#10b981' : '#ef4444' }}>
                ${(ingresosTotales - egresosTotales).toLocaleString('es-CO')}
              </p>
            </div>
          </div>

          {/* Detalle de reportes */}
          <div className="cuenta-info" style={{ gridColumn: 'span 2' }}>
            <h3>Detalle de Ingresos</h3>
            <div className="info-item">
              <span className="info-label">Total de Depósitos:</span>
              <span className="info-valor">{transacciones.filter(t => t.tipo === 'deposito').length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Promedio por Depósito:</span>
              <span className="info-valor">
                ${transacciones.filter(t => t.tipo === 'deposito').length > 0 
                  ? Math.round(ingresosTotales / transacciones.filter(t => t.tipo === 'deposito').length).toLocaleString('es-CO')
                  : '0'}
              </span>
            </div>
          </div>

          <div className="cuenta-info" style={{ gridColumn: 'span 2' }}>
            <h3>Detalle de Egresos</h3>
            <div className="info-item">
              <span className="info-label">Total de Retiros:</span>
              <span className="info-valor">{transacciones.filter(t => t.tipo === 'retiro').length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total de Transferencias:</span>
              <span className="info-valor">{transacciones.filter(t => t.tipo === 'transferencia').length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Promedio por Egreso:</span>
              <span className="info-valor">
                ${(transacciones.filter(t => t.tipo === 'retiro' || t.tipo === 'transferencia').length > 0
                  ? Math.round(egresosTotales / transacciones.filter(t => t.tipo === 'retiro' || t.tipo === 'transferencia').length).toLocaleString('es-CO')
                  : '0')}
              </span>
            </div>
          </div>

          <div className="cuenta-info" style={{ gridColumn: 'span 2' }}>
            <h3>Detalle de Préstamos</h3>
            <div className="info-item">
              <span className="info-label">Préstamos Activos:</span>
              <span className="info-valor">{prestamos.length}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Prestado:</span>
              <span className="info-valor">
                ${prestamos.reduce((sum, p) => sum + p.monto, 0).toLocaleString('es-CO')}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Deuda Pendiente:</span>
              <span className="info-valor activo" style={{ color: '#ef4444' }}>
                ${deudasTotales.toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
