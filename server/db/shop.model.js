module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "shop",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            shop: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            accessToken: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "shop",
        }
    );
};
