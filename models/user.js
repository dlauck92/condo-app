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
        lastLogin: DataTypes.DATE,
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