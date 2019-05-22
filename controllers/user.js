'use strict';

const userModel =require('../models/user.js');

const captchapng = require('captchapng2');

module.exports = {

	showRegister:async (ctx,next)=>{
	  // let users = await userModel.getUsers();
		ctx.render('register');

	},

	checkUsername:async (ctx,next)=>{

		// 处理接受请求之类的繁琐事务，
		let { username } = ctx.request.body;

		// 查询数据库 中是否存在该用户名
		let users = await userModel.findUserByuserName(username);
		// console.log(users);

		if(users.length === 0){
			ctx.body = {
							code:"001",
							msg:"可以注册"
						}
			return;
			// return (ctx.body);
		}
		ctx.body = {
					code:"002",
					msg:"用户名已存在"
				}
		

	},

	doRegister:async (ctx,next)=>{

		let { username,password,email,v_code } = ctx.request.body;

		// ctx.body= {
		// 	msg:123
		// }

		//遇到的问题：https://segmentfault.com/q/1010000009473088
		//问题出在 router/UserRouter.js

		// 查询数据库 中是否存在该用户名
		let users = await userModel.findUserByuserName(username);

		// 比较v_code
	    if (v_code !== ctx.session.v_code) {
			    ctx.body = {
			        code: '002',
			        msg: '验证码不正确'
			    };
			    return;
			}

		if(users.length !== 0){
			// console.log("002");
			ctx.body = {
				code:"002",
				msg:"用户名已存在"
			}
			return;
			// return (ctx.body);
		}

		try{

			//userModel.registerUser(argu)---用es6:实现可变参数
			let result = await userModel.registerUser(username,password,email);

			if(result.affectedRows === 1){
				ctx.body = {
					code:"001",
					msg:"注册成功！"
					}
					return;
					// return (ctx.body);
			}

		}catch(e){

			ctx.throw(200);

		}


	},

	doLogin:async (ctx,next)=>{

		let {username,password} = ctx.request.body;

		//返回的是个数组
		let users = await userModel.findUserDataByuserName(username);

		// console.log(users);

		if(users.length === 0){
			ctx.body = {
				code:"002",
				msg:"用户名或密码不正确"
			}
			return;
		}

		let user = users[0];

		if(user.password === password){
			ctx.body = {
				code:"001",
				msg:"登录成功"
			}

			//挂载到session
			ctx.session.user = user;

			return;
		}
		//用户名正确，密码不正确
		ctx.body = {
			code:"002",
			msg:"用户名或密码不正确"
		}


	},
	//获取验证码
	getPic: (ctx,next)=>{
		let rand = parseInt(Math.random() * 9000 + 1000);
	    let png = new captchapng(80, 30, rand); // width,height, numeric captcha
	    // 区分不同用户的答案，并分配session，响应cookie
    	ctx.session.v_code = rand+'';
    	ctx.response.set('Content-Type','image/png');
    	ctx.body = png.getBuffer();

	},

	//退出：1：清除session.user 2:定向到要展示的页面
	logout:async function(ctx,next){

		ctx.session.user = null;
		ctx.redirect('/user/login')

	}

}










