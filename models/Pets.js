module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
	id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
	},
	petname: {
	    type: DataTypes.STRING,
	    allowNull: false,
	    validate: {
		len: [1]
	    }
	},
	birthday: {
	    type: DataTypes.TEXT,
	    allowNull: true,
	    validate: {
		len: [1]
	    }
	},
	gender: {
	    type: DataTypes.TEXT,
	    allowNull: false,
	    validate: {
		len: [1]
	    }
	},
	species: {
	    type: DataTypes.TEXT,
	    allowNull: false,
	    validate: {
		len: [1]
	    }
	},
	breed: {
	    type: DataTypes.TEXT,
	    allowNull: true,
	    validate: {
		len: [1]
	    }
	}
    }, {
	// We're saying that we want our user to have pets
	classMethods: {
	    associate: function(model) {
		// A foreignKey is required or a pet can't be made
		Pet.belongsTo(model.User, {
		    foreignKey: {
			allowNull: false
		    }
		});
 		Pet.hasMany(model.PetPic, {
		    onDelete: "cascade"
		});
		// need to check table name for posts
		Pet.hasMany(model.Post,  {
		    onDelete: "cascade"
		});
	    }
	}	
    });
    return Pet;
};
