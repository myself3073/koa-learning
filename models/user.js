
const db = require('./db.js');

module.exports = {

	getUsers:async ()=> await db.q('select * from user',[]),

	finduserByuserName:async (username) => await db.q('select * from user where username=?',[username]),

	registerUser:async (...argu) => await db.q('insert into user (username,password,email) values (?,?,?)',argu),	
}