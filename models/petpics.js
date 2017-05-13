module.exports = function(seuqalize, dataTypes) {
    var PetPic = sequalize.define("PetPic", {
	url: {
	    type: dataTypes.STRING,
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
    return petPic;
};
