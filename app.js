'use strict';

const Koa = require('koa');

const Router = require('koa-router');

const bodyparser = require('koa-bodyparser');

const formidable = require('koa-formidable');
 
//引入配置
let { appPort,viewsDir,staticDir,uploadDir } = require('./config.js');

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


//处理错误
// const handler = async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.response.status = err.statusCode || err.status || 500;
//     // ctx.response.body = {
//     //   message: err.message
//     // };
//     throw err;
//   }
// };

// 优雅的处理异常
app.use(require('./middleware/error.js'));

//在路由之前 解析请求体数据
// app.use(bodyparser());

// 处理上传的文件
app.use(formidable({
  uploadDir:uploadDir,
  keepExtensions:true
}));

//为了staitic有效果，得重写URL   重写URL和定向URL的区别？
app.use(require('./middleware/rewriteUrl.js')(require('./rewriteUrlConfig.js')));

//处理静态资源
app.use(require('koa-static')(staticDir));

//处理路由中间件
app.use(userRouter.routes());

app.use(musicRouter.routes());



//处理405 方法不匹配 和 501 方法未实现
app.use(userRouter.allowedMethods());

//开启服务器
app.listen(appPort,()=>{

	console.log(`服务器启动在${appPort}端口`);

});






