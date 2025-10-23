import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './Sidebar.jsx';

const Prestamos = () => {
  const { usuario } = useAuth();
  const [montoPrestamo, setMontoPrestamo] = useState('');
  const [plazo, setPlazo] = useState('12');
  const [motivo, setMotivo] = useState('');

  const solicitarPrestamo = (e) => {
    e.preventDefault();
    
    const prestamos = JSON.parse(localStorage.getItem('prestamos') || '[]');
    
    const nuevoPrestamo = {
      id: Date.now(),
      usuarioId: usuario.id,
      monto: parseFloat(montoPrestamo),
      plazo: parseInt(plazo),
      motivo,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'aprobado',
      montoPendiente: parseFloat(montoPrestamo)
    };
    
    prestamos.push(nuevoPrestamo);
    localStorage.setItem('prestamos', JSON.stringify(prestamos));
    
    // Agregar el monto del préstamo como transacción (depósito)
    const transacciones = JSON.parse(localStorage.getItem('transacciones') || '[]');
    transacciones.push({
      id: Date.now() + 1,
      usuarioId: usuario.id,
      tipo: 'deposito',
      monto: parseFloat(montoPrestamo),
      descripcion: `Préstamo aprobado - ${motivo}`,
      fecha: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
    
    alert('¡Préstamo aprobado! El dinero se ha depositado en tu cuenta');
    setMontoPrestamo('');
    setMotivo('');
  };

  const prestamosUsuario = JSON.parse(localStorage.getItem('prestamos') || '[]')
    .filter(p => p.usuarioId === usuario?.id);

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Solicitud de Préstamos</h1>
          <p>Solicita un préstamo y recibe el dinero de inmediato</p>
        </div>

        <div className="dashboard-grid">
          {/* Formulario de solicitud */}
          <div className="cuenta-info" style={{ gridColumn: 'span 1' }}>
            <h3>Solicitar Préstamo</h3>
            
            <form onSubmit={solicitarPrestamo} className="login-form">
              <div className="form-group">
                <label>Monto Solicitado</label>
                <input
                  type="number"
                  value={montoPrestamo}
                  onChange={(e) => setMontoPrestamo(e.target.value)}
                  placeholder="$0.00"
                  min="100000"
                  max="50000000"
                  required
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Monto mínimo: $100,000 - Máximo: $50,000,000
                </small>
              </div>

              <div className="form-group">
                <label>Plazo (meses)</label>
                <select value={plazo} onChange={(e) => setPlazo(e.target.value)}>
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                  <option value="24">24 meses</option>
                  <option value="36">36 meses</option>
                  <option value="48">48 meses</option>
                </select>
              </div>

              <div className="form-group">
                <label>Motivo del Préstamo</label>
                <textarea
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Describe el motivo de tu préstamo"
                  rows="3"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: '2px solid #e0e0e0',
                    fontFamily: 'inherit'
                  }}
                  required
                />
              </div>

              <div className="stat-card" style={{ marginBottom: '20px' }}>
                <div className="stat-info">
                  <p className="stat-label">Cuota Mensual Aproximada</p>
                  <p className="stat-valor">
                    ${montoPrestamo ? Math.round(montoPrestamo / plazo).toLocaleString('es-CO') : '0'}
                  </p>
                </div>
              </div>

              <button type="submit" className="btn-login">
                Solicitar Préstamo
              </button>
            </form>
          </div>

          {/* Lista de préstamos activos */}
          <div className="transacciones-container">
            <h3>Mis Préstamos</h3>
            <div className="transacciones-lista">
              {prestamosUsuario.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999' }}>No tienes préstamos activos</p>
              ) : (
                prestamosUsuario.map((prestamo) => (
                  <div key={prestamo.id} className="transaccion-item">
                    <div className="transaccion-icon">💳</div>
                    <div className="transaccion-info">
                      <p className="transaccion-descripcion">{prestamo.motivo}</p>
                      <p className="transaccion-fecha">
                        Plazo: {prestamo.plazo} meses | {prestamo.fecha}
                      </p>
                    </div>
                    <div className="transaccion-monto egreso">
                      ${prestamo.monto.toLocaleString('es-CO')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prestamos;
