module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                len: {
                    args: [
                        1,
                        140
                    ],
                    msg: "String length is not in this range"
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                len: {
                    args: [
                        6,
                        40
                    ],
                    msg: "Username must be at least 6 characters in length"
                }
            }
        },
        about: {
            type: DataTypes.STRING,
                },
        
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // eslint-disable-next-line camelcase
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            // eslint-disable-next-line new-cap
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
         
    });
    // userSchema.methods = {
    //     checkPassword: function (inputPass) {
    //         return bcrypt.compareSync(inputPass, this.password);
    //     },
    //     hashPassword: userPassword => {
    //         return bcrypt.hashSync(userPassword, 10);
    //     }
    // }
    
    // userSchema.pre('save', function (next) {
    //     if (!this.password) {
    //         next();
    //     } else {
    //         this.password = this.hashPassword(this.password);
    //         next();
    //     }
    // });
    // User.associate = function (models) {
    //     User.hasMany(models.Post,models.WorkOrder, {  
    //         onDelete: "cascade"
    //     });
    // };



    return User;
};