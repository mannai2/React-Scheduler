import React, { useState } from "react";
import "./App.css";
import LoginB from "./components/LoginB";
import LoginM from "./components/LoginM";
import AddM from "./components/AddM";
import CalendrierB from "./components/CalendrierB";
import Dashboard from "./components/Dashboard";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [isTextVisible, setIsTextVisible] = useState(true);

  const navigateBur = () => {
    setIsTextVisible(false); // Cacher le texte lorsque le bouton est cliqué
    navigate('/loginB');
  };

  const navigateMem = () => {
    setIsTextVisible(false);
    navigate('/loginM');
  };

  const navigateReg = () => {
    setIsTextVisible(false);
    navigate('/AddM');
  };

  const navigateHome = () => {
    setIsTextVisible(true); // Afficher le texte lorsque le bouton est cliqué
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        {isTextVisible && (
          <div className="float-text-container">
            <p className="big-text calendar-text">Calendrier du <span className="club-text">club</span></p>
          </div>
        )}
        <div className="Navbar">
          <button onClick={navigateHome}>Accueil</button>
          <button onClick={navigateBur}>Connexion au Bureau</button>
          <button onClick={navigateMem}>Connexion Membre</button>
          <button onClick={navigateReg}>Inscription Membre</button>
        </div>
        <Routes>
          <Route path="/loginB" element={<LoginB />} />
          <Route path="/loginM" element={<LoginM />} />
          <Route path="/CalendrierB" element={<CalendrierB />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/addM" element={<AddM />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
