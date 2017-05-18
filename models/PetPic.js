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
	image_type: {
	    type: DataTypes.STRING,
	    allowNull: false
	},
	image: {
	    type: DataTypes.BLOB('long')
	},
	image_size: {
	    type: DataTypes.INTEGER
	},
	image_name: {
	    type: DataTypes.STRING
	    }
    }, {
	// needs upload pic col
	classMethods: {
	    associate: function(model) {
		PetPic.belongsTo(model.Pet, {
		    foreignKey: {
			allowNull: false
		    }
		});
		// need to check table name for posts
		PetPic.belongsTo(model.Post, {
		   foreignKey: {
			allowNull: false
		    }
		});
	    }
	}
    });
    return PetPic;
};
