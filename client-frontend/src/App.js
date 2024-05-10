import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicationServers from './Components/ApplicationServers';
import NavigationBar from './Components/NavBar';
import Home from './Components/Home'; 
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servers" element={<ApplicationServers />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
