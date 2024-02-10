import React, { useState, useEffect } from 'react';
import DeleteM from './DeleteM';
import EditM from './EditM';
import 'bootstrap/dist/css/bootstrap.min.css';


const ListM = () => {
  const [membersData, setMembersData] = useState([]);
  const [editMemberId, setEditMemberId] = useState(null);
  const [attendedEvents, setAttendedEvents] = useState([]);

  const fetchMembersData = async () => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('http://localhost:8080/api/membre/membreList', fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setMembersData(data.membersData);

        // Fetch attended events for each member
        const attendedEventsPromises = data.membersData.map((member) =>
          fetchEventsAttended(member.idM)
        );

        Promise.all(attendedEventsPromises).then((attendedEventsData) => {
          setAttendedEvents(attendedEventsData);
        });
      } else {
        console.error('Error fetching members data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const fetchEventsAttended = async (idM) => {
    try {
      const response = await fetch(`http://localhost:8080/api/attendance/getAttendedEvents2/${idM}`);
      if (response.ok) {
        const attendedEvents = await response.json();
        console.log(`Events attended by member with ID ${idM}:`, attendedEvents);
        return attendedEvents;
      } else {
        console.error('Error fetching attended events data');
        return [];
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchMembersData();
  }, []);

  const handleDelete = async (memberId) => {
    console.log('Delete member with ID:', memberId);
    fetchMembersData();
  };

  const handleEdit = (memberId) => {
    setEditMemberId(memberId);
    // Fetch events attended when editing
    fetchEventsAttended(memberId);
  };

  const handleEditComplete = () => {
    setEditMemberId(null);
    fetchMembersData(); // Trigger re-fetch after edit
  };

  return (
    <div className="container">
      <div className="d-flex flex-row"> {/* Ajoutez la classe "flex-row" ici */}
        {membersData.map((member, index) => (
          <MemberCard
            key={member.idM}
            member={member}
            onDelete={handleDelete}
            onEdit={handleEdit}
            editMemberId={editMemberId}
            handleEditComplete={handleEditComplete}
            attendedEvents={attendedEvents[index] || []}
          />
        ))}
      </div>
    </div>
  );
};

const MemberCard = ({ member, onDelete, onEdit, editMemberId, handleEditComplete, attendedEvents }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card-container">
        <div className="card card-appear">
        <h2>nom: {member.nom}</h2>
          prenom: {member.prenom}
          <br />
          numero tel: {member.numero}
          <br />
          numero cin: {member.cin}
          <br />
          email: {member.email}
       
          <h4>Attended Events:</h4>
          <ul>
            {attendedEvents.map((event) => (
              <li >{event.subject}</li>
            ))}
          </ul>
        
        
          <button
            className="e-card-btn"
            onClick={() => onEdit(member.idM)}
            disabled={editMemberId === member.idM}
          >
            EDIT
          </button>
          <DeleteM onDelete={onDelete} memberId={member.idM} />
          {editMemberId === member.idM && (
            <EditM memberId={member.idM} onEdit={handleEditComplete} />
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default ListM;
