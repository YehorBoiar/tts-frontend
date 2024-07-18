import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpperBar from './components/UpperBar';
import Signin from './pages/signin';
import Register from './pages/register';
import Home from './pages/home';
import Dosound from './pages/dosound';

function App() {
  return (
    <Router>
      <div>
        <UpperBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dosound" element={<Dosound />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
