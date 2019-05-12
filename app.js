'use strict';

const Koa = require('koa');

const Router = require('koa-router');

const bodyparser = require('koa-bodyparser');

const path = require('path');

//引入配置
let { appPort,viewsDir,staticDir } = require('./config.js');

//创建服务
const app = new Koa();

// 引入和使用中间件


//渲染模板
const render = require('koa-art-template');

render(app, {
  root: viewsDir,
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//Music路由
const musicRouter = require('./router/MusicRouter.js');

//User路由
const userRouter = require('./router/userRouter.js');


//为了staitic有效果，得重写URL
app.use(async(ctx,next)=>{

	if(ctx.request.url.startsWith('/public')){

		ctx.request.url = ctx.request.url.replace('/public','');
	}

	await next();
});

//处理静态资源
app.use(require('koa-static')(staticDir));

//在路由之前 解析请求体数据
app.use(bodyparser());

//处理路由中间件

app.use(musicRouter.routes());

app.use(userRouter.routes());

//开启服务器
app.listen(appPort,()=>{

	console.log(`服务器启动在${appPort}端口`);

});






