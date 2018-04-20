'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: {
              args: [6, 128],
              msg: "Email address must be between 6 and 128 characters in length"
          },
          isEmail: {
              msg: "Email address must be valid"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
      },
      user_id: { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      type:{
        type: DataTypes.INTEGER
      },
      language:{
        type: DataTypes.STRING
      },
      api_token:{
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'users',
      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },  
  );

  User.associate = function(models){
    User.hasOne(models.crm_prospect, { as:'CrmProspect',foreignKey: 'user_id'} );
  }
  return User;
};