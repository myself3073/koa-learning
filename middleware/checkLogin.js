module.exports = async (ctx,next)=>{
  if(ctx.url.startsWith('/user')){
    await next();
    return;
  }
  //没登录的
  if(!ctx.session.user){
    ctx.body = `<h1>您还没登录，请去<a href='/user/login'>登录！</a></h1>`;
    return;
  }

  //其他的业务

  //为了程序的健壮性
  await next();
}