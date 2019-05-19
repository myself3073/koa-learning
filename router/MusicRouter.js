'use strict';
const Router = require('koa-router');

const MusicRoute = new Router();

const musicModle = require('../controllers/music.js');

MusicRoute.post('/music/add-music',musicModle.addMusic)
.get('/music/edit-music',async (ctx)=>{

	ctx.render('edit');

});


module.exports = MusicRoute;


