module.exports = function(sequelize, DataTypes) {
    var PetPic = sequelize.define("PetPic", {
	id:{
            type: DataTypes.INTEGER ,
            primaryKey : true ,
            autoIncrement : true
	},
	url: {
	    type: DataTypes.STRING,
	    allowNull: true
	}
    }, {
	// needs upload pic col
	classMethods: {
	    associate: function(models) {
		PetPic.belongsTo(models.Pet, {
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
