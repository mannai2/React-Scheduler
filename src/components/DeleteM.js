
import React from 'react';


const DeleteM = ({ onDelete, memberId }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/membre/deleteMember/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {

        onDelete();
        
      } else {
        console.error('Error deleting member');
      }
    } catch (error) {
      console.error('Error during delete:', error);
    }
  };

  return (
    <button className="e-card-btn" onClick={handleDelete}>
      DELETE
    </button>
  );
};

export default DeleteM;
