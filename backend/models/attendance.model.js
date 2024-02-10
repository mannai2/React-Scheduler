module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendance", {
      idA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idM: {
        type: Sequelize.INTEGER,
        references: {
          model: 'membres',
          key: 'idM',
        },
        allowNull: false,
      },

      idE: {
        type: Sequelize.INTEGER,
        references: {
          model: 'scheduleevents', 
          key: 'id',
        },
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        references: {
          model: 'scheduleevents', 
          key: 'subject',
        },
      },
      attendance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
    }, {
      timestamps: false
    });
  
    return Attendance;
  };