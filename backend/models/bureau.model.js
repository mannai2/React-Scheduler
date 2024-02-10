module.exports = (sequelize, Sequelize) => {
  const Bureau = sequelize.define("bureau", {
    idB: {
      type: Sequelize.INTEGER,
      primaryKey: true
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
    fonction: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false // Exclude createdAt and updatedAt
  });

  return Bureau;
};
