import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpperBar from './components/UpperBar';
import Signin from './pages/signin';
import Register from './pages/register';
import UploadFile from './components/UploadFile';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="p-4">
        <UpperBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadFile />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
