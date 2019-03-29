module.exports = function (sequelize, DataTypes) {
    var WorkOrder = sequelize.define("WorkOrder", {

        ticket_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        ticket_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        complete: DataTypes.BOOLEAN,
            
        

    });

    WorkOrder.associate = function (models) {
        WorkOrder.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return WorkOrder;
 
};
