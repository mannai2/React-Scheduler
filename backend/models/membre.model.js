module.exports = (sequelize, Sequelize) => {
  const Membre = sequelize.define("membre", {
    idM: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    userr: {
      type: Sequelize.STRING
    },
    passwordd: {
      type: Sequelize.STRING
    },
    numero: {
      type: Sequelize.STRING
    },
    cin: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false // Exclude createdAt and updatedAt
  });

  return Membre;
};
