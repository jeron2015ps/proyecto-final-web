import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './Sidebar.jsx';

const Transacciones = () => {
  const { usuario } = useAuth();
  const [tipoOperacion, setTipoOperacion] = useState('transferencia');
  const [monto, setMonto] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const realizarOperacion = (e) => {
    e.preventDefault();
    
    // Obtener transacciones actuales
    const transacciones = JSON.parse(localStorage.getItem('transacciones') || '[]');
    
    const nuevaTransaccion = {
      id: Date.now(),
      usuarioId: usuario.id,
      tipo: tipoOperacion,
      monto: parseFloat(monto),
      destinatario: tipoOperacion === 'transferencia' ? destinatario : null,
      descripcion,
      fecha: new Date().toISOString().split('T')[0]
    };
    
    transacciones.push(nuevaTransaccion);
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
    
    alert(`${tipoOperacion} realizada exitosamente`);
    setMonto('');
    setDestinatario('');
    setDescripcion('');
  };

  // Obtener transacciones del usuario
  const transaccionesUsuario = JSON.parse(localStorage.getItem('transacciones') || '[]')
    .filter(t => t.usuarioId === usuario?.id);

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Transacciones</h1>
          <p>Realiza transferencias, depósitos y retiros</p>
        </div>

        <div className="dashboard-grid">
          {/* Formulario de transacciones */}
          <div className="cuenta-info" style={{ gridColumn: 'span 2' }}>
            <h3>Nueva Operación</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                  onClick={() => setTipoOperacion('transferencia')}
                  className={`btn-operacion ${tipoOperacion === 'transferencia' ? 'active' : ''}`}
                >
                  💸 Transferencia
                </button>
                <button 
                  onClick={() => setTipoOperacion('deposito')}
                  className={`btn-operacion ${tipoOperacion === 'deposito' ? 'active' : ''}`}
                >
                  💰 Depósito
                </button>
                <button 
                  onClick={() => setTipoOperacion('retiro')}
                  className={`btn-operacion ${tipoOperacion === 'retiro' ? 'active' : ''}`}
                >
                  🏧 Retiro
                </button>
              </div>
            </div>

            <form onSubmit={realizarOperacion} className="login-form">
              {tipoOperacion === 'transferencia' && (
                <div className="form-group">
                  <label>Número de Cuenta Destinatario</label>
                  <input
                    type="text"
                    value={destinatario}
                    onChange={(e) => setDestinatario(e.target.value)}
                    placeholder="001-XXXXXX"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Monto</label>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="$0.00"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Concepto de la operación"
                />
              </div>

              <button type="submit" className="btn-login">
                Realizar {tipoOperacion}
              </button>
            </form>
          </div>

          {/* Historial de transacciones */}
          <div className="transacciones-container" style={{ gridColumn: 'span 2' }}>
            <h3>Historial de Transacciones</h3>
            <div className="transacciones-lista">
              {transaccionesUsuario.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999' }}>No hay transacciones registradas</p>
              ) : (
                transaccionesUsuario.map((trans) => (
                  <div key={trans.id} className="transaccion-item">
                    <div className="transaccion-icon">
                      {trans.tipo === 'deposito' ? '💰' : trans.tipo === 'retiro' ? '🏧' : '💸'}
                    </div>
                    <div className="transaccion-info">
                      <p className="transaccion-descripcion">
                        {trans.tipo.charAt(0).toUpperCase() + trans.tipo.slice(1)} - {trans.descripcion}
                      </p>
                      <p className="transaccion-fecha">{trans.fecha}</p>
                    </div>
                    <div className={`transaccion-monto ${trans.tipo === 'deposito' ? 'ingreso' : 'egreso'}`}>
                      {trans.tipo === 'deposito' ? '+' : '-'}${trans.monto.toLocaleString('es-CO')}
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

export default Transacciones;
