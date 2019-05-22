'use strict'
const musicModel = require('../models/music.js');

const path = require('path');

module.exports = {

	//添加音乐操作
	addMusic:async (ctx,next)=>{

		// let { body,files } = ctx.request;

		// console.log(ctx.request.body);
		// console.log(ctx.request.files);

		// 获取文字数据  和文件数据

		let { title,singer,time} = ctx.request.body;		

		// 获取歌词和歌曲的路径(网络)
	
		let filePath = ctx.request.files.file.path;

		let fileLrcPath = ctx.request.files.filelrc.path;

		// // 使用核心对象path 解析,并获取其base属性
		// let net_filePath = '/public/files/' + path.parse(filePath).base;
		// let net_fileLrcPath = '/public/files/' + path.parse(fileLrcPath).base;

		let songObj = {
			title,
			singer,
			time
		}

		//歌词可选
		songObj.filelrc = 'No'

		if(fileLrcPath) {
		      songObj.filelrc = '/public/files/' + path.parse(fileLrcPath).base;
		}

		if(!ctx.request.files.file) {
		      ctx.throw('歌曲必须上传');
		      return;
		}

		songObj.file = '/public/files/' + path.parse(filePath).base;

		//uid

		let uid = '1';

		songObj.uid = uid;

		//将数据保存进数据库
		let result = await musicModel.addMusic(Object.values(songObj));

			ctx.body = {
				code:"001",
				msg:"添加成功！"
			}
			return;

	}
}
