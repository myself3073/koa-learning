'use strict'
const musicModel = require('../models/music.js');

const path = require('path');

//不这是进行封装的 原来的=>music_backup.js

function saveSong(ctx) {

		let { title,singer,time,filelrc} = ctx.request.body;		

		let songObj = {
			title,
			singer,
			time
		}

		if(!ctx.request.files.file) {
		      ctx.body = {
		      	code:"002",
		      	msg:"歌曲必须上传！"
		      }
		      return;
		}

		let filePath = ctx.request.files.file.path;

		songObj.file = '/public/files/' + path.parse(filePath).base;

		songObj.filelrc = filelrc;

		if(!ctx.request.files.filelrc){
			songObj.filelrc = '/public/files/No_Lrc.lrc';
		}

		if(ctx.request.files.filelrc) {
		      songObj.filelrc = '/public/files/' + path.parse(ctx.request.files.filelrc.path).base;
		}

		// songObj.uid = 1;

		songObj.uid = ctx.session.user.id;

		return songObj;
}

module.exports = {

	//添加音乐操作
	addMusic:async (ctx,next)=>{

		if(!saveSong(ctx)){
			return;
		}

		let songObj = saveSong(ctx);

		//将数据保存进数据库
		let result = await musicModel.addMusic(Object.values(songObj));

			ctx.body = {
				code:"001",
				msg:"添加成功！"
			}
			return;

	},
	updateMusic:async (ctx,next)=>{

		if(!saveSong(ctx)){
			return;
		}

		let {id} = ctx.request.body;

		let songObj = saveSong(ctx);
		
		//合并对象
		//合并后：{title,singer,time,file,filelrc,id}
		Object.assign(songObj,{id});

		let result = await musicModel.updateMusic(Object.values(songObj));

		if(result.affectedRows !== 1){
			ctx.body = {
				code:'002',
				msg:result.message
			}
			return;
		}

		ctx.body = {
				code:'001',
				msg:'更新成功'
			}

	},
	async deleteMusic(ctx,next){
		// console.log(ctx.request.body);
		// console.log(ctx.request.query);
		// 接收请求url中的查询字符串
		// let id = ctx.query.id;

		let {id} = ctx.request.body;

		let result = await musicModel.deleteMusicById(id);

			if(result.affectedRows !== 1){
				ctx.body = {
					code:'002',
					msg:result.message
				}
				return;
			}

		ctx.body = {
				code:'001',
				msg:'删除成功'
			}

		},


	//服务器从url中获取id,找到相应的歌曲，连同编辑页面一起返回
	editMusic:async (ctx,next)=>{
		// 接收请求url中的查询字符串
		let id = ctx.query.id;

		let musics = await musicModel.findMusicById(id);

		if(musics.length === 0){
			
			ctx.throw("该歌曲不存在");

			return;
		}

		let music = musics[0];
		// console.log(music);

		ctx.render('edit',{
			music
		})

	},

	showIndex: async (ctx,next)=>{

		let uid = ctx.session.user.id;

		let musics = await musicModel.findMusicByUid(uid);
		// console.log(musics);

		ctx.render('index',{
			musics:musics
		});

	},

	

}
