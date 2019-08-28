module.exports = (sequelize, DataTypes) => {
  return sequelize.define("book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicationYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER,
      allownull: false
    }
  });
};
