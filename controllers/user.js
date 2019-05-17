'use strict';

const userModel =require('../models/user.js');

module.exports = {

	showRegister:async (ctx,next)=>{
	  let users = await userModel.getUsers();
      console.log(users);
		ctx.render('register');

	},

	checkUsername:async (ctx,next)=>{

		// 处理接受请求之类的繁琐事务，
		let { username } = ctx.request.body;

		// 查询数据库 中是否存在该用户名
		let users = await userModel.finduserByuserName(username);
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
		let users = await userModel.finduserByuserName(username);

		if(users.length !== 0){
			console.log("002");
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


	}




}










