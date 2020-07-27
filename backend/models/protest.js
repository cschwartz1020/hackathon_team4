module.exports = (sequelize, Sequelize) => {
  const Protest = sequelize.define("protest", {
    title: {
      type: Sequelize.STRING,
    },
    summary: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.DATE,
    },
    resources: {
      type: Sequelize.JSON,
    },
    location: {
      type: Sequelize.JSON,
    },
  });
  return Protest;
};
