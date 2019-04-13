<<<<<<< HEAD
/* eslint-disable max-lines-per-function */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
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
        location: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                len: {
                    args: [
                        2,
                        50
                    ],
                    msg: "Location must be at least 2 characters in length"
                }
            }
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
=======
module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		firstname: { type: Sequelize.STRING,notEmpty: true},
		lastname: { type: Sequelize.STRING,notEmpty: true},
		username: {type:Sequelize.TEXT},
		about : {type:Sequelize.TEXT},
		email: { type:Sequelize.STRING, validate: {isEmail:true} },
		password : {type: Sequelize.STRING,allowNull: false }, 
		last_login: {type: Sequelize.DATE},
        status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }

});
// User.associate = function (models) {
    //     User.hasMany(models.Post,models.Announcement, {  //deleted models.WorkOrder  on 4/10
    //         onDelete: "cascade"
    //     });
    // };
	return User;
>>>>>>> b93fb3e93013920b442c52edc51bb05f57820155

}