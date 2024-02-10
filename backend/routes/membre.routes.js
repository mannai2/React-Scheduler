module.exports = app => {
    const membreController = require("../controllers/membre.controller.js");
    const router = require("express").Router();
    router.post("/LoginM", membreController.loginMembre);
    router.get("/membreList", membreController.getMembersData);
    router.delete("/deleteMember/:id", membreController.deleteMembre);
    router.get('/getMember/:id', membreController.getMember);
    router.put('/editMember/:id', membreController.editMember);
    router.post('/addMember', membreController.addMember);
    app.use('/api/membre', router);

};
