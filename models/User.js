// used to encrypt password in database
var bcrypt = require("bcryptjs");

// create new user in table
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
	id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
	},
	first_name: {
	    type: DataTypes.STRING,
	    allowNull: false,
	    validate: {
		len: [3]
	    }
	},
	last_name: {
	    type: DataTypes.STRING
	    allowNull: false,
	    validate: {
		len: [2]
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
            associate: function(model) {
		// Associating user with pets
		// When an user is deleted, also delete any associated pets
		User.hasMany(model.Pet, {
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
