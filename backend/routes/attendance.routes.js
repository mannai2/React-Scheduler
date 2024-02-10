module.exports = app => {
    const attendanceController = require("../controllers/attendance.controller.js");
    var router = require("express").Router();
    router.put('/editAt', attendanceController.editAttendance);
    router.get('/getAttendedEvents/:attendeeId', attendanceController.getAttendedEvents);
    router.get('/getAttendedEvents2/:idM', attendanceController.getAttendedEvents2);
    return
    app.use('/api/attendance', router);
};
