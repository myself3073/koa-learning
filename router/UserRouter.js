'use strict';
const Router = require('koa-router');

const UserRoute = new Router();

const userControllers = require('../controllers/user.js');

UserRoute.get('/user/login',async (ctx)=>{
	ctx.render('login');
})
.get('/user/get-pic',userControllers.getPic)
.get('/user/register',userControllers.showRegister)
.post('/user/check-username',userControllers.checkUsername)
.post('/user/do-register',userControllers.doRegister)
.post('/user/do-login',userControllers.doLogin)
.get('/user/logout',userControllers.logout)

////遇到的问题：https://segmentfault.com/q/1010000009473088
		//问题出在 这：get or post 后执行后面的回调函数 回调函数里执行我们真正想执行的函数
		//要想前端拿到数据（能拿到ctx.body）userControllers.showRegister 
		//userControllers.doRegister 这几个函数必须 return ctx.body
		//否则拿不到
// .get('/user/register',(ctx,next)=>{
// 	userControllers.showRegister(ctx,next);
// })
// .post('/user/check-username',(ctx,next)=>{
// 	userControllers.checkUsername(ctx,next);
// })
// .post('/user/do-register',(ctx,next)=>{
// 	userControllers.doRegister(ctx,next);
// })


module.exports = UserRoute;