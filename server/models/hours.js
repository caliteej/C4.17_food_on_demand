module.exports = (sequelize, DataTypes) => {
    let Hours = sequelize.define("hours", {
        day: {
            type: DataTypes.STRING,
            allowNull: false
        },
        open: {
            type: DataTypes.STRING,
            allowNull: false
        },
        close: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Hours
};