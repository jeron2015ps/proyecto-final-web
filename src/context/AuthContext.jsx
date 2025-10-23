import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Usuario simulado para el login
const USUARIO_SIMULADO = {
  email: 'usuario@banco.com',
  password: '123456',
  nombre: 'Juan Pérez',
  saldo: 125430.50,
  numeroTarjeta: '4532 1234 5678 9010',
  numeroCuenta: '001-234567-89'
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const iniciarSesion = (email, password) => {
    if (email === USUARIO_SIMULADO.email && password === USUARIO_SIMULADO.password) {
      setUsuario(USUARIO_SIMULADO);
      setEstaAutenticado(true);
      return { exito: true };
    }
    return { exito: false, mensaje: 'Credenciales incorrectas' };
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setEstaAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
