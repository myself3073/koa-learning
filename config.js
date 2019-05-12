const path = require('path');
module.exports = {
	appPort:8888,
	viewsDir:path.join(__dirname, 'views'),
	staticDir:path.resolve('./public'),
	dbConfig:{
			  connectionLimit : 10,
			  host            : 'localhost',
			  user            : 'root',
			  password        : 'op110120',
			  database        : 'users'
			},
}