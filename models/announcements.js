module.exports = function (sequelize, DataTypes) {
    var Announcement = sequelize.define("Announcement", {

        announcement_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        announcement_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }

    });

    Announcement.associate = function (models) {
        Announcement.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Announcement;
 
};
