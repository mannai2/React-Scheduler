import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddM = () => {
  const navigate = useNavigate();

  const navigateM = () => {
    navigate('/loginM');
  };

  const [memberData, setMemberData] = useState({
    nom: '',
    prenom: '',
    userr: '',
    passwordd: '',
    numero: '',
    cin: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/membre/addMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (response.ok) {
        console.log('Membre inscrit avec succès');
        navigateM();
      } else {
        console.error("Échec de l'inscription du membre");
      }
    } catch (error) {
      console.error('Erreur pendant l\'inscription :', error);
    }
  };

  return (
    <div className="card-container">
      <div className="card card-appear">
        <h2>Enregistrement Membre</h2>
        <form>
          <label>Nom:</label>
          <input type="text" name="nom" value={memberData.nom} onChange={handleInputChange} />

          <label>Prénom:</label>
          <input type="text" name="prenom" value={memberData.prenom} onChange={handleInputChange} />

          <label>Nom d'utilisateur:</label>
          <input type="text" name="userr" value={memberData.userr} onChange={handleInputChange} />

          <label>Mot de passe:</label>
          <input type="password" name="passwordd" value={memberData.passwordd} onChange={handleInputChange} />

          <label>Numéro de téléphone:</label>
          <input type="text" name="numero" value={memberData.numero} onChange={handleInputChange} />

          <label>CIN:</label>
          <input type="text" name="cin" value={memberData.cin} onChange={handleInputChange} />

          <label>Email:</label>
          <input type="email" name="email" value={memberData.email} onChange={handleInputChange} />
        </form>
        <br></br>
        <button type="button" onClick={handleSignUp}>S'inscrire</button>
      </div>

      
    </div>
  );
};

export default AddM;
