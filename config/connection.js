var mysql = require("mysql");
var Sequelize = require("sequelize");
var sequelize;

if(true) {
    sequelize = mysql.createConnection("te9wfawo5tw28q49:dm8qbmpnwynhhnff@hngomrlb3vfq3jcr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/fpttmgc0i0212g2h");
} else {
    sequelize = new Sequelize('perfectpet_db', 'root', 'pChrms1115', {
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
