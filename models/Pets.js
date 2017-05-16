module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
	petname: {
	    type: DataTypes.STRING,
	    allowNull: false,
	    validate: {
		len: [1]
	    }
	},
	birthday: {
	    type: DataTypes.TEXT,
	    allowNull: false,
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
	    allowNull: false,
	    validate: {
		len: [1]
	    }
	}
	// needs profile pic
    },
    {
	// We're saying that we want our user to have pets
	classMethods: {
            associate: function(models) {
		// A foreignKey is required or a pet can't be made
		Pet.belongsTo(models.User, {
		    foreignKey: {
		    allowNull: false
		    }
		});
 		Pet.hasMany(models.PetPics, {
			onDelete: "cascade"
		});
		// need to check table name for posts
		Pet.hasMany(models.Posts,  {
		    onDelete: "cascade"
		});
	    }
	}	
    });
    return Pet;
};
