var mysql = require("mysql");
var Sequelize = require("sequelize");
var sequelize;

if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize('process.env.JAWSDB_URL');
} else {
    sequelize = new Sequelize('database', 'root', 'pChrms1115', {
	host: 'localhost',
	dialect: 'mysql',
	

	pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	}
    });
};


// Or you can simply use a connection uri


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
