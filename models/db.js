var mysql = require('mysql');
var { dbConfig } = require('../config.js');
var pool  = mysql.createPool(dbConfig);
 
var db = {};

 // db.q('select..',[],function(err,data) {
 //    if(err) {

 //    }
 //    console.log(data);
 // })

//let data = db.q('select..',[])
// 
db.q = function (sql,params) {
  return new Promise((resolve,reject)=>{
    // 取出链接
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql,params, function (error, results, fields) {
            console.log(`${sql}=>${params}`);
             // 释放连接
            connection.release();
              if(err){
                reject(err);
              }
            // error是否为空由数据库查询结果决定
            resolve(results);
      });
    });

  })
}


// 导出对象
module.exports = db;
