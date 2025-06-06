import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Archive from './pages/Archive';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
        <Route path="/archive" element={<ProtectedRoute><Archive /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
