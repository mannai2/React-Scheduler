// EditM.js
import React, { useState, useEffect } from 'react';

const EditM = ({ memberId, onEdit }) => {
  const [editedMember, setEditedMember] = useState({
    nom: '',
    prenom: '',
    numero: '',
    cin: '',
    email: '', 
  });

  const fetchMemberData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/membre/getMember/${memberId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEditedMember(data.memberData || {
          nom: '',
          prenom: '',
          numero: '',
          cin: '',
          email: '', 
        });
      } else {
        console.error('Error fetching member data for editing');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, [memberId]);

  const handleEdit = async () => {

    try {
      const response = await fetch(`http://localhost:8080/api/membre/editMember/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMember),
      });
  
      if (response.ok) {
        // If edit is successful, trigger the onEdit callback
        onEdit();
      } else {
        console.error('Error editing member');
      }
    } catch (error) {
      console.error('Error during edit:', error);
    }
  };
  

  return (
    <div>
      <h3>Edit Member</h3>
      <form>
        {/* Include form fields for editing member data */}
        <label>
          Nom:
          <input
            type="text"
            value={editedMember.nom}
            onChange={(e) => setEditedMember({ ...editedMember, nom: e.target.value })}
          />
        </label>
        <label>
          prenom:
          <input
            type="text"
            value={editedMember.prenom}
            onChange={(e) => setEditedMember({ ...editedMember, prenom: e.target.value })}
          />
        </label>
        <label>
          numero tel:
          <input
            type="text"
            value={editedMember.numero}
            onChange={(e) => setEditedMember({ ...editedMember, numero: e.target.value })}
          />
        </label>
        <label>
          numero cin:
          <input
            type="text"
            value={editedMember.cin}
            onChange={(e) => setEditedMember({ ...editedMember, cin: e.target.value })}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            value={editedMember.email}
            onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
          />
        </label>
        
        <button type="button" onClick={handleEdit}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditM;
