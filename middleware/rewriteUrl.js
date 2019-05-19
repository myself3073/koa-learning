/**
 * 重写URl
 * 需求: 1:以/public开头,使用其他部分（正则）
 *       2:精确:/ 或者 /abc  要替换成 /xxx
 *       2.2:模糊: /xxx 开头 替换成/aaa
 *       [ 
          {regex:/\/abc/,dist:'/user/login'},
          {regex:/\/public(.*)/,dist:null }, // dist:null 则使用.*的内容
          {src:'/',dist:'/user/login'}
         ] 
 
 */

module.exports = (options) => {
	//每次请求一个ctx.url，每个ctx.url要进行多个匹配
    return async (ctx, next) => {

    	for (let i = 0; i < options.length; i++) {
    		let rule = options[i];
    		// 是否需要使用正则
    		if(rule.regex){
    			// console.log("要正则匹配的");
    			//RegExpObject.exec(string) 
    			//返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
    			//如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，
    			//第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），
    			//第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推
    			let result = rule.regex.exec(ctx.url);
    			// result不匹配null或者匹配
    			if(result){
    				if(!rule.dist){
    					ctx.url = result[1];
	    			}else{
						ctx.url = rule.dist;
	    			}
    			}

    		}

    		// 字符串精确匹配的
    		if(ctx.url == rule.src){
    			ctx.url = rule.dist;
    		}
    	}
       


    	//放行
        await next();
    }
}



// module.exports = (options) => {
//     return async (ctx, next) => {

//         if (ctx.request.url.startsWith('/public')) {

//             ctx.request.url = ctx.request.url.replace('/public', '');
//         }

//         if (ctx.url === '/') {
//             ctx.url = '/user/login';
//         }

//         await next();
//     }
// }