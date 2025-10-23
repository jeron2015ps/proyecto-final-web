const ListaTransacciones = () => {
  const transacciones = [
    { id: 1, tipo: 'ingreso', descripcion: 'Salario Mensual', monto: 4500000, fecha: '2025-10-20' },
    { id: 2, tipo: 'egreso', descripcion: 'Supermercado Éxito', monto: -320000, fecha: '2025-10-19' },
    { id: 3, tipo: 'egreso', descripcion: 'Netflix Suscripción', monto: -45000, fecha: '2025-10-18' },
    { id: 4, tipo: 'ingreso', descripcion: 'Transferencia Recibida', monto: 500000, fecha: '2025-10-17' },
    { id: 5, tipo: 'egreso', descripcion: 'Gasolina', monto: -180000, fecha: '2025-10-16' },
    { id: 6, tipo: 'egreso', descripcion: 'Restaurante', monto: -95000, fecha: '2025-10-15' }
  ];

  return (
    <div className="transacciones-container">
      <h3>Transacciones Recientes</h3>
      <div className="transacciones-lista">
        {transacciones.map((trans) => (
          <div key={trans.id} className="transaccion-item">
            <div className="transaccion-icon">
              {trans.tipo === 'ingreso' ? '📥' : '📤'}
            </div>
            <div className="transaccion-info">
              <p className="transaccion-descripcion">{trans.descripcion}</p>
              <p className="transaccion-fecha">{trans.fecha}</p>
            </div>
            <div className={`transaccion-monto ${trans.tipo}`}>
              ${Math.abs(trans.monto).toLocaleString('es-CO')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaTransacciones;
