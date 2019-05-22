
//表单数据上传
function formDataUpLoad(formId){
  $('#'+formId).on('submit',function(e){
            e.preventDefault();
            //$('form').serialize()不能解决文件上传
            //So 用HTML5的：new formData()  https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
            var inputs = document.querySelectorAll("#"+formId+" input[name]");         
            var fd = new FormData();
                fd.append("title", inputs[1].value);
                fd.append("time", inputs[2].value);
                fd.append("singer", inputs[3].value);
                // 传文件对象的方式
                //(files这个属性是原生DOM的属性，jq获取的没有改属性)
                fd.append("file", inputs[4].files[0]);
                fd.append("filelrc", inputs[5].files[0]);
                $.ajax({
                  url: "/music/add-music",
                  type: "POST",
                  data: fd,
                  dataType:"JSON",
                  processData: false,  // 不处理数据
                  contentType: false,  // 不设置内容类型
                  success:function(data){
                    if(data.code === "001"){
                        window.location = '/music/index';
                    }else{
                        alert(data.msg);
                    }
                  } 
                });
            })
}