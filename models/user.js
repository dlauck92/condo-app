module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },
        
        user_profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },

    // connection.query('\
    //     CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    //         `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    //         `username` VARCHAR(20) NOT NULL, \
    //         `password` CHAR(60) NOT NULL, \
    //             PRIMARY KEY (`id`), \
    //         UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    //         UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
    //     )');

        lastLogin: DataTypes.DATE,

        first_name: DataTypes.STRING,
        
        last_name: DataTypes.STRING,
        
        address: DataTypes.STRING,
        
        phone: DataTypes.STRING,

        owner: DataTypes.BOOLEAN,
            
        boardManager: DataTypes.BOOLEAN,
            
        tentant: DataTypes.BOOLEAN,
            
    });
    User.associate = function (models) {
        User.hasMany(models.Post,models.WorkOder,models.Announcement, {
            onDelete: "cascade"
        });
    };

    return User;
};