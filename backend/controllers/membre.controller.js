const db = require("../models");
const MemberHandler = db.membre;
const AttendanceHandler = db.attendance;
exports.loginMembre = async (req, res) => {
  console.log('Request to /api/LoginMembre received');
  const { username, password } = req.body;

  // Validate request body
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid password' });
  }

  try {
    // Find member with the given username and password
    const member = await MemberHandler.findOne({
      where: { userr: username, passwordd: password },
    });

    if (member) {
      req.session.user = { idM: member.idM, userr: member.userr }; // Set idM in the session
      res.json({ message: 'Login successful', user: { idM: member.idM, userr: member.userr } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getMembersData = async (req, res) => {
  console.log('Request to retrieve members data received');

  try {
    // Retrieve data of members
    const membersData = await MemberHandler.findAll();
    res.json({ membersData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.deleteMembre = async (req, res) => {
  console.log('Request to delete member received');
  const memberId = req.params.id; // Assuming you pass member id in the URL parameter

  try {
    // Check if the member with the given id exists
    const member = await MemberHandler.findByPk(memberId);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Delete the member's attendances first
    await AttendanceHandler.destroy({
      where: {
        idM: memberId,
      },
    });

    // Now, delete the member
    await MemberHandler.destroy({
      where: {
        idM: memberId,
      },
    });

    res.json({ message: 'Member and their attendances deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getMember = async (req, res) => {
  console.log('Request to get a member by ID received');
  const memberId = req.params.id;

  try {
    // Retrieve the member by ID
    const member = await MemberHandler.findByPk(memberId);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Send the member data as a response
    res.json({ member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.editMember = async (req, res) => {
  console.log('Request to edit member received');
  const memberId = req.params.id;
  const updatedData  = req.body;



  try {
    const member = await MemberHandler.findByPk(memberId);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check if updatedData is defined and is an object
    if (updatedData && typeof updatedData === 'object') {
      member.nom = updatedData.nom || member.nom;
      member.prenom = updatedData.prenom || member.prenom;
      member.userr = updatedData.userr || member.userr;
      member.passwordd = updatedData.passwordd || member.passwordd;
      member.numero = updatedData.numero || member.numero;
      member.cin = updatedData.cin || member.cin;
      member.email = updatedData.email || member.email;

      // Save the changes
      await member.save();

      res.json({ message: 'Member updated successfully' });
    } else {
      console.error('Invalid updatedData format:', updatedData);
      return res.status(400).json({ error: 'Invalid updatedData format' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addMember = async (req, res) => {
  console.log('Request to /api/membre/addMembre received');

  const { nom, prenom, userr, passwordd, numero, cin, email } = req.body;

  // Validate request body
  if (!nom || !prenom || !userr || !passwordd || !numero || !cin || !email) {
    return res.status(400).json({ error: 'Invalid member data' });
  }

  try {
    // Create a new member in the database
    const newMember = await MemberHandler.create({
      nom,
      prenom,
      userr,
      passwordd,
      numero,
      cin,
      email,
    });

    res.json({ message: 'Member added successfully', member: newMember });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


