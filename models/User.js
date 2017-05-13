// used to encrypt password in database
var bcrypt = require("bcrypt-nodejs");

// create new user in table
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
      username: {
	  type: DataTypes.STRING,
	  allowNull: false,
	  validate: {
	      len: [3]
	  }
      }, 
      email:  {
	  type: DataTypes.STRING,
	  allowNull: false,
	  validate: {
	      isEmail: true
	  }
      },
      password: {
	  type: DataTypes.STRING,
	  allowNull: false
      }
  }, {
      // validates password
      instanceMethods: {
	  validPassword: function(password) {
	      return bcrypt.compareSync(password, this.password);
	  }
      },
      
      classMethods: {
          associate: function(models) {
              // Associating user with pets
              // When an user is deleted, also delete any associated pets
              User.hasMany(models.pets, {
		  onDelete: "cascade"
              });
          }
      },
      // encrypts password before it is saved to db
      hooks: {
	  beforeCreate: function(user, options, cb) {
              User.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
              cb(null, options);
	  }
      }
  });			     
    return User;
};
