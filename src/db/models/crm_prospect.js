'use strict';
module.exports = (sequelize, DataTypes) => {
  var CrmProspect = sequelize.define('crm_prospect',
    {
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      id : { 
        type: DataTypes.INTEGER, primaryKey: true
      },
      gender: {
        type: DataTypes.STRING,
      },
      first_name_jp: {
        type: DataTypes.STRING,
      },
      last_name_jp: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'crm_prospects',

      updatedAt: 'modified',
      createdAt: 'created',
      timestamps: true
  },
  );
  CrmProspect.associate = function(models){
    CrmProspect.belongsTo(models.user, { as:'User',foreignKey: 'user_id'} );
  }

return CrmProspect;

};

