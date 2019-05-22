
const db = require('./db.js');

module.exports = {

	getUsers:async ()=> await db.q('select * from users',[]),

	findUserByuserName:async (username) => await db.q('select 1 from users where username=?',[username]),

	registerUser:async (...argu) => await db.q('insert into users (username,password,email) values (?,?,?)',argu),

	findUserDataByuserName:async (username) => await db.q('select * from users where username=?',[username])
}