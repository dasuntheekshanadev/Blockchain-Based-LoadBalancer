import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicationServers from './Components/ApplicationServers';
import NavigationBar from './Components/NavBar';
import Home from './Components/Home'; // Import the Home component

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servers" element={<ApplicationServers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
