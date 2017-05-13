module.exports = function(sequelize, DataTypes) {
    var PetPic = sequelize.define("PetPic", {
	url: {
	    type: DataTypes.STRING,
	    allowNull: true
	}, 
	// needs upload pic col
	classMethods: {
	    associate: function(models) {
		PetPic.belongsTo(models.Pets, {
		    foreignKey: {
			allowNull: false
		    }
		});
		// need to check table name for posts
		PetPic.belongsTo(models.Posts, {
		    foreignKey: {
			allowNull: false
		    }
		});
	    }
	}
    });
    return PetPic;
};
