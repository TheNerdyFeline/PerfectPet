// used to encrypt password in database
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    // Giving the Author model a name of type STRING
      username: {
	  type: DataTypes.STRING,
	  allowNull: false,
	  validate: {
	      len: [3]
	  }
      }, 
      email:  {
	  type: DataTypes.STRING,
	  allowNull: false
	  validate: {
	      isEmail: true
	  }
      },
      password: {
	  type: DataTypes.STRING,
	  allowNull: false
      }
  }, {
      
      instanceMethods: {
	  validPassword: function(password) {
	      return bcrypt.compareSync(password, this.password);
	  }
      },
      
      classMethods: {
          associate: function(models) {
              // Associating Author with Posts
              // When an Author is deleted, also delete any associated Posts
              user.hasMany(models.pets, {
		  onDelete: "cascade"
              });
          }
      },
      hooks: {
	  beforeCreate: function(user, options, cb) {
              user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
              cb(null, options);
	  }
      }
  });			     
    return user;
};
