import React, { useState, useEffect } from 'react';

const ListA = () => {
  const [eventsData, setEventsData] = useState([]);
  const [attendeeId, setAttendeeId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      const idM  = storedUser.idM;
      console.log('User ID:', idM);
      setAttendeeId(idM);
      fetchAttendedEvents(idM);
      fetchEventsData(); 
    } else {
      console.log('Error retrieving id');
    }
  }, []);

  useEffect(() => {
    
  }, [eventsData]);

  const fetchAttendedEvents = async (attendeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/attendance/getAttendedEvents/${attendeeId}`);
      if (response.ok) {
        const attendedEvents = await response.json();
        
        const eventsWithAttendance = eventsData.map(event => ({
          ...event,
          attended: attendedEvents.some(attendance => attendance.idE === event.id && attendance.attendance),
        }));
        
        setEventsData(eventsWithAttendance);
      } else {
        console.error('Error fetching attended events data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const fetchEventsData = async () => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('http://localhost:8080/api/scheduleevents/getEvents', fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setEventsData(data.eventsData);
      } else {
        console.error('Error fetching events data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleAttend = async (id,subject) => {
    try {
      const response = await fetch('http://localhost:8080/api/attendance/editAt', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attendeeId,
          id,
          subject,
        }),
      });

      if (response.ok) {
        console.log('Attendance recorded successfully');
        fetchAttendedEvents(attendeeId);
      } else {
        console.error('Failed to record attendance');
      }
    } catch (error) {
      console.error('Error during attendance:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {eventsData.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onAttend={() => handleAttend(event.id,event.subject)}
            disabled={event.attended}
            
          />
        ))}
      </div>
    </div>
  );
};

const EventCard = ({ event, onAttend, disabled }) => {
    
    
  return (
    <div className="col-md-4 mb-3">
      <div className="e-card">
        <div className="e-card-header-title">Event: {event.subject}</div>
        <div className="e-card-content">
          Description: {event.description}
          <br />
          Start Time: {event.starttime}
          <br />
          End Time: {event.endtime}
          <br />
          Location: {event.location}
        </div>
        <div className="e-card-actions e-card-vertical">
          <button
            className="e-card-btn"
            onClick={onAttend}
            disabled={disabled}
          >
            {disabled ? 'Will Attend' : 'Attend'}
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ListA;
