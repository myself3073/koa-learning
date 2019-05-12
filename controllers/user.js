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
		console.log(users);

		if(users.length == 0){
			console.log("001");
			ctx.body = {
				"code":"001",
				"msg":"可以注册"
			}
			return;
		}

		ctx.body = {
			"code":"002",
			"msg":"用户名已存在"
		}
		console.log("002");

	}




}










