import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginM = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); // Nouvel état
  const navigate = useNavigate();

  const navigateDash = () => {
    navigate('/Dashboard');
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch('http://localhost:8080/api/membre/LoginM', fetchOptions);

      if (response.ok) {
        const { user } = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Connexion réussie', user);
        navigateDash();
      } else {
        console.error('Échec de la connexion');
        // Affichez la boîte de dialogue en cas d'échec de connexion
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Erreur pendant la connexion :', error);
    }
  };

  const handleCloseErrorModal = () => {
    // Fermez la boîte de dialogue lorsque l'utilisateur clique sur OK
    setShowErrorModal(false);
  };

  return (
    <div className="card-container card-appear">
      <div className="card">
        <h2>Connexion Membre</h2>
        <form>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <br />

        <button onClick={handleLogin}>Connexion Membre</button>

        {/* Boîte de dialogue d'erreur */}
        {showErrorModal && (
          <div className="error-modal">
            <p>Échec de la connexion. Vérifiez votre nom d'utilisateur et votre mot de passe.</p>
            <button onClick={handleCloseErrorModal}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginM;
