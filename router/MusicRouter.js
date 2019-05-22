'use strict';
const Router = require('koa-router');

const MusicRoute = new Router();

const musicModle = require('../controllers/music.js');

MusicRoute.get('/music/index',musicModle.showIndex)
.get('/music/add',async (ctx)=>{
	ctx.render('add');
})
.get('/music/edit',musicModle.editMusic)
.post('/music/add-music',musicModle.addMusic)
.put('/music/update-music',musicModle.updateMusic)
.post('/music/del-music',musicModle.deleteMusic)



module.exports = MusicRoute;


