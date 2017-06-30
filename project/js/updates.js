var urlTools = {
    //获取RUL参数值
    getUrlParam: function(name) {               /*?videoId=identification  */
        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = params.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
};
var art_id = urlTools.getUrlParam("art_id");  // 获取url中的参数
$.ajax({
        url:"/artshop/customCenter/getStoreOneArt",//请求地址
        data:{artId:art_id},//提交的数据
        type:"POST",//提交的方式
        dataType:"JSON", //返回类型
        success:function(data){
            var id = data[0].id;
            $("#id").val(id);
          //藏品名称
            var name = data[0].name;
            $("#name").val(name);
         //价格
            var price = data[0].price;
            $("#price").val(price);
        //材质
            var texture = data[0].texture;
            $("#texture").val(texture);
        //年代
            var epoch =data[0].epoch;
            $("#epoch").val(epoch);
               

        },
        error:function(){
            alert("404");
        }
    })

   //修改价格 
   function y_submit(){
       var id = $("#id").val();
       var price = $("#price").val();

        $.ajax({
                    url:"/artshop/customCenter/changeArtStatus",//请求地址
                    data:{id:id,price:price},//提交的数据
                    type:"POST",//提交的方式
                    async:false,
                    success:function(data){
                        if(data=='1'){
                            alert("修改成功！");
                            history.back();
                            location.reload();
                        }else if(data=='0'){
                            alert("修改失败！");
                        }
                    },
                    error:function(){
                        alert("404");
                    }
        })
   }