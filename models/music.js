'use strict'

const db = require('./db.js');

module.exports = {
	addMusic:async (song)=>await db.q('insert into music (title,singer,time,file,filelrc,uid) values (?,?,?,?,?,?)',song),
	updateMusic:async (updateSong) => await db.q('update music set title=?,singer=?,time=?,file=?,filelrc=?,uid=? where id=?',updateSong),
	deleteMusicById:async id => await db.q('delete from music where id = ?',[id]),
	findMusicById:async (id) => await db.q('select * from music where id =?',[id]),
	findMusicByUid:async (uid) => await db.q('select * from music where uid =?',[uid]),
}