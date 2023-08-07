const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Sequelize models synced to the database.');

    app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
  } catch (error) {
    console.error('Unable to sync Sequelize models to the database:', error);
  }
})();
