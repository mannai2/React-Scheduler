// attendance.controller.js
const db = require('../models');
const Attendance=db.attendance;

exports.editAttendance = async (req, res) => {
    console.log('Request to edit attendance received');
    const { attendeeId, id, subject } = req.body;
  
    try {
      // Check if the attendee has already attended this event
      const existingAttendance = await Attendance.findOne({
        where: { idM: attendeeId, idE: id, subject: subject},
      });
  
      if (existingAttendance) {
        // If attendance record exists, update the attendance status
        existingAttendance.attendance = true;
        await existingAttendance.save();
      } else {
        // If attendance record doesn't exist, create a new one
        await Attendance.create({
          idM: attendeeId,
          idE: id,
          subject: subject,
          attendance: true,
        });
      }
  
      res.json({ message: 'Attendance recorded successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.getAttendedEvents = async (req, res) => {
    console.log('Request to get attended events received');
    const { attendeeId } = req.params;
  
    try {
      // Fetch all events that the attendee has attended
      const attendedEvents = await Attendance.findAll({
        where: { idM: attendeeId, attendance: true },
        attributes: ['idE','attendance'],
      });
  
      res.json(attendedEvents);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.getAttendedEvents2 = async (req, res) => {
    console.log('Request to get attended events received');
    const { idM } = req.params;
  
    try {
      // Fetch all events that the attendee has attended
      const attendedEvents = await Attendance.findAll({
        where: { idM: idM},
        attributes: ['subject'],
      });
  
      res.json(attendedEvents);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
