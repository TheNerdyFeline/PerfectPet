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
	},
	image: {
	    type: DataTypes.BLOB('long'),
	    allownull: true
	}
    }, {
	classMethods: {
	    associate: function(models) {
		PetPic.belongsTo(models.Pet, {
		    foreignKey: {
			name: "petfk",
			allowNull: false
		    }
		});
		// need to check table name for posts
		PetPic.belongsTo(models.Post, {
		    foreignKey: {
			name: "postfk",
			allowNull: false
		    }
		});
	    }
	}
    });
    return PetPic;
};
