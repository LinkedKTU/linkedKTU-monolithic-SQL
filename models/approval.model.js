// Approval model
module.exports = (sequelize, DataTypes) => {
    const Approval = sequelize.define('Approval', {
      studentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Student',
          key: 'id'
        }
      },
      lecturerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Lecturer',
          key: 'id'
        }
      }
    });
  
    return Approval;
  };