'use strict'

const db = require('./db.js');

module.exports = {
	addMusic:async (song)=>await db.q('insert into music (title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)',song),
	
}