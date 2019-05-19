
const db = require('./db.js');

module.exports = {

	getUsers:async ()=> await db.q('select * from users',[]),

	finduserByuserName:async (username) => await db.q('select * from users where username=?',[username]),

	registerUser:async (...argu) => await db.q('insert into users (username,password,email) values (?,?,?)',argu),	
}