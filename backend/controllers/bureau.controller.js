const db = require("../models");
const BureauHandler = db.bureau;


exports.loginBureau = async(req,res) => {
  
    console.log('Request to /api/LoginB received');
    const { username, password } = req.body;
  
    // Validate request body
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Invalid username' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid password' });
    }
  
    try {
      // Find bureau with the given username and password
      const bureau = await BureauHandler.findOne({
        where: { userr: username, passwordd: password },
      });
  
      if (bureau) {
        req.session.user = bureau; // Assuming you have session middleware set up
        res.json({ message: 'Login successful'});
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};
 




