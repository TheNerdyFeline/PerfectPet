module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
	id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
	},
	post: {
	    type: DataTypes.TEXT,
	    allowNull: false,
	    len: [1]
	}
    }, {
	classMethods: {
	    associate: function(model) {
		Post.belongsTo(model.Pet, {
		    foreignKey: {
			allowNull: false
		    }
		});
	    }
	}	
    });
    return Post;
};
