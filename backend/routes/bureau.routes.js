module.exports = app => {
    const bureauController = require("../controllers/bureau.controller.js");
    var router = require("express").Router();
    router.post("/LoginB", bureauController.loginBureau);
    app.use('/api/bureau', router);
};
