var urlTools = {
    //获取RUL参数值
    getUrlParam: function(name) {               /*?videoId=identification  */
        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = params.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
};
var orderid = urlTools.getUrlParam("orderid");  // 获取url中的参数
console.log(orderid);
$(function(){
    $.ajax({
        url:"/artshop/customCenter/selectDetailsByOrderId",//请求地址
        data:{orderid:orderid},//提交的数据
        type:"POST",//提交的方式
        dataType:"JSON", //返回类型
        success:function(data){
            console.log(data);
            //名称
            var name = data[0].name;
            $("#name").val(name);
            //材质
            var texture = data[0].texture;
            $("#texture").val(texture);
            //年代
            var epoch  = data[0].epoch;
            $("#epoch").val(epoch);
            //价格
            var pic = data[0].totalPrice;
            $("#pic").val(pic);
            //是否付款
            var isplay = data[0].oraderStatus;
            if(isplay=='1'){
                isplay='已付款';
            }else{
                isplay='待付款';
            }

            $("#isplay").val(isplay);
            //商品类型
            var shop_class = data[0].origin;
            if(shop_class=='1'){
                shop_class='拍品订单';
            }else{
                shop_class='店铺藏品定单';
            }

            $("#shop_class").val(shop_class);
            //收货人
            var name = data[0].receiveName;
            $("#name1").val(name);

             var phone = data[0].receivePhone;
            $("#phone").val(phone);

              var ad = data[0].province+''+data[0].city+''+data[0].county+''+data[0].detailAddress;
            $("#address").val(ad);
 
            getImageShow(data);
            //从服务其获取图片的路径显示图片
            function getImageShow(m){
                var imgs = $("#grxxtu").find("img");//找到刚才渲染的每个img标签
                if(imgs && imgs.length > 0){
                    $.each(imgs,function(i,n){//遍历每一个标签
                        var imageId = m[0].img_id.split(',');//截取获取真正的imgId
                        //远程获取图片地址
                        $.get("/artshop/imageShow/getImageUrlBySize?imgId="+imageId[i]+"&size=100",function(url_){
                            if(url_){
                                $(n).attr("src",url_);//获取到地址后，赋值src，显示图片

                            }
                        })
                    })
                }
            }

        },
        error:function(){
            alert("404");
        }
    })


})

function formatDate(date){
    if(!isNaN(date)){
        var date_  = new Date(parseInt(date));
        return date_.getFullYear()+"-"+(date_.getMonth()+1)+"-"+date_.getDate()+" "+date_.getHours()
            +":"+date_.getMinutes()+":"+date_.getSeconds();
    }
}
