module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    // Giving the Author model a name of type STRING
      username: {
	  type: DataTypes.STRING,
	  allowNull: false,
      }, 
      email:  {
	  type: DataTypes.STRING,
	  allowNull: false
      },
      password: {
	  type: DataTypes.STRING,
	  allowNull: false
      }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          user.hasMany(models.pets, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return user;
};
