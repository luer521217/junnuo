var urlTools = {
    //获取RUL参数值
    getUrlParam: function(name) {               /*?videoId=identification  */
        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = params.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
};
var artId = urlTools.getUrlParam("artId");  // 获取url中的参数
$(function(){
  $.ajax({
    url:"/artshop/customCenter/getMyArtById",//请求地址
    data:{artId:artId},//提交的数据
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
        //作者
        var author = data[0].author;
        $("#author").val(author);
        //尺寸
        var size = data[0].size;
        $("#size").val(size);
        //重量
        var weight = data[0].weight;
        $("#weight").val(weight);
        //数量
        var amount = data[0].amount;
        $("#amount").val(amount);
        //发布日期
        var postdate = data[0].postdate;
        $("#date").val(formatDate(postdate));
        //操作時間
        var operateTime = data[0].operateTime;
        $("#date3").val(formatDate(operateTime));
        //简介
        var intro = data[0].intro;
        $("#intro").val(intro);
        //一级类别名称
        var sortName = data[0].sortName;
        $("#sortName").val(sortName);
         //二级类别名称
        var detailName = data[0].detailName;
        $("#detailName").val(detailName);

        var  aa = data[0].isAppraisal;
        var bb = data[0].isAuction;
        var cc = data[0].isStore;

        var aa1='';
        var bb1='';
        var cc1='';


        switch(aa)
        {
            case '1':
                aa1='鉴定品';
                break;
            case '0':
                aa1='非鉴定品';
                break;
            default:
                aa1='非鉴定品';
        }

        switch(bb)
        {
            case '1':
                bb1='拍品';
                break;
            case '0':
                bb1='非拍品';
                break;
            default:
                bb1='非拍品';
        }

        switch(cc)
        {
            case '1':
                cc1='店铺藏品';
                break;
            case '0':
                cc1='非店铺藏品';
                break;
            default:
                cc1='非店铺藏品';
        }
        $("#status").val(aa1+'  '+bb1+'  '+cc1);

console.log( $("#status").val())



        // if(aa==1){
        //     $("#status").val('已送鉴');
        // }
        // if(bb==1){
        //     $("#status").val('已送拍');
        // }
        // if(cc==1){
        //     $("#status").val('在店铺');
        // }

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
