module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      classMethods: {
        associate: function(models) {

          Post.belongsTo(models.PetPics, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }

    {
      classMethods: {
        associate: function(models) {

          Post.belongsTo(models.Pets, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Post;
};
