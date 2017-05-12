module.exports = function(sequelize, DataTypes) {
    var pet = sequelize.define("pet", {
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
    },
    {
	// We're saying that we want our Author to have Posts
	classMethods: {
            associate: function(models) {
		// An Author (foreignKey) is required or a Post can't be made
		pet.belongsTo(models.user, {
		    foreignKey: {
		    allowNull: false
		    }
		});
 		pet.hasMany(models.petpics, {
			onDelete: "cascade"
		});
		pet.hasMany(models.posts,  {
		    onDelete: "cascade"
		});
	    }
	}	
    });
    return pet;
};
