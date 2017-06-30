var all_imgs = ['','','',''];//所有的图片id，将来用来作为提交保存的图片id数据
 var alertImg = "图片必须是jpg格式";


//上传图片
function uploadimg(id_flag){
	$("#form"+id_flag).ajaxSubmit({
                success: function (data) {
                	if(data[0] == "error" || data[0].length < 14){
                		alert(alertImg);
                	}else{
                    	all_imgs[id_flag-1] = data[0];
                    	show_uploadImg(data[0],$("#img_show"+id_flag));
                	}
                },
                error: function (error) { alert(alertImg); },
                url: "/artshop/image/upload", /*上传文件的servlet，设置post提交到的页面*/
                type: "post", /*设置表单以post方法提交*/
                dataType: "json" /*设置返回值类型为文本*/
            });
}
function show_uploadImg(img_id,dom){
	$.post(
     	//根据图片id获取其裁剪尺寸后图片的url地址
      	'/artshop/imageShow/getImageUrlBySize',
      	//参数名imgId,size
      	{imgId:img_id,size:150},
      	function(data){
      	//得到url拼接html
      		if(data){
      			dom.attr("src",data);
      	}
     	});
}
   //检查图片是否都上传了
  function check_img(){
   	for(var i  =0;i<all_imgs.length;i++){
   		if(!all_imgs[i]){
   			return false;
   		}
   	}
   	return true;
   }