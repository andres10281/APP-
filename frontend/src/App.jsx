import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePasajero  from './pages/createPasajero';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/createPasajero" element={<CreatePasajero />} /> 
        <Route path="/login" element={<Login />} />
      </Routes> 
      
    </BrowserRouter>
  );
}

export default App;
