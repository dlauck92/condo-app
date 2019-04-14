module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
            
            
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            
            
        }

    });

    // Post.associate = function (models) {
    //     Post.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Post;
 
};
