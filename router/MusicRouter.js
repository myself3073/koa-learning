'use strict';
const Router = require('koa-router');

const MusicRoute = new Router();

MusicRoute.get('/',async (ctx)=>{

	ctx.render('index');

})
.get('/music/add-music',async (ctx)=>{

	ctx.render('add')

})
.get('/music/edit-music',async (ctx)=>{

	ctx.render('edit');

});


module.exports = MusicRoute;


