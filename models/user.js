'use strict'

const db = require('./db.js');

module.exports = {
	getUsers:async ()=> await db.q('select * from user',[]),
	finduserByuserName:async username => await db.q('select * from user where username=?',username),
}