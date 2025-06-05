import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Quote from './pages/Quote';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/quote' element={<Quote />} /> 
      </Routes>
    </Router>
  )
}

export default App
