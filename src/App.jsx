import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Login from './components/Login.jsx';
import Registro from './components/Registro.jsx';
import Dashboard from './components/Dashboard.jsx';
import Transacciones from './components/Transacciones.jsx';
import Prestamos from './components/Prestamos.jsx';
import Reportes from './components/Reportes.jsx';
import './App.css';

const RutaProtegida = ({ children }) => {
  const { estaAutenticado } = useAuth();
  return estaAutenticado ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
          <Route path="/transacciones" element={<RutaProtegida><Transacciones /></RutaProtegida>} />
          <Route path="/prestamos" element={<RutaProtegida><Prestamos /></RutaProtegida>} />
          <Route path="/reportes" element={<RutaProtegida><Reportes /></RutaProtegida>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
