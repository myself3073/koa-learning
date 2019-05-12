'use strict';
const Router = require('koa-router');

const UserRoute = new Router();

const userControllers = require('../controllers/user.js');

UserRoute.get('/user/login',async (ctx)=>{
	ctx.render('login');
})
.get('/user/register',(ctx,next)=>{
	userControllers.showRegister(ctx,next);
})
.post('/user/check-username',(ctx,next)=>{
	userControllers.checkUsername(ctx,next);
});


module.exports = UserRoute;