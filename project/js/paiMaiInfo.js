var urlTools = {
    //获取RUL参数值
    getUrlParam: function(name) {               /*?videoId=identification  */
        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = params.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
};
var auctionId = urlTools.getUrlParam("auctionId");  // 获取url中的参数
$(function(){
  $.ajax({
    url:"/artshop/customCenter/auctionDetails",//请求地址
    data:{auctionId:auctionId},//提交的数据
    type:"POST",//提交的方式
    dataType:"JSON", //返回类型
    success:function(data){
        if(!data || data.length < 1){
            return;
        }
        var dataOne = data[0];
        //藏品编码

        //藏品名称      
        $("#name").val(dataOne.name);
        //藏品类别

        //材质
        $("#texture").val(dataOne.texture);
        //尺寸
        $("#size").val(dataOne.size);
        //数量
        $("#amount").val(dataOne.amount);
        //重量
        $("#weight").val(dataOne.weight);
        //发布日期

        //简介
        $("#intro").val(dataOne.intro);
        //拥有者姓名
       
        //成交客户姓名
     
        //拥有者电话
       
        //成交客户电话
      
        //起拍价
        $("#startPrice").val(dataOne.startPrice);
        //成交价
        $("#endPrice").val(dataOne.endPrice);
         //点击量
        $("#hits").val(dataOne.hits);      
        //保证金
        $("#earnest").val(dataOne.earnest);
        //加价幅度
        $("#rangePrice").val(dataOne.rangePrice);
        //最高加价幅度

        //拍卖开始时间
        $("#startTime").val(formatDate(dataOne.startTime));
        //拍卖结束时间
        $("#endTime").val(formatDate(dataOne.endTime));
        //拍卖状态
        if(dataOne.auctionStatus==0){
                $('#auctionStatus').val('拍卖预展');
            }else if(dataOne.auctionStatus==1){
                $('#auctionStatus').val('正在拍卖');
            }else if(dataOne.auctionStatus==2){
                $('#auctionStatus').val('拍卖结束');
            }else if(dataOne.auctionStatus==3){
                $('#auctionStatus').val('流拍');
            }
        //拍卖档次
        if(dataOne.auctionRank==0){
                $('#auctionRank').val('低端拍卖');
            }else if(dataOne.auctionRank==1){
                $('#auctionRank').val('中端拍卖');
            }else if(dataOne.auctionRank==2){
                $('#auctionRank').val('高端拍卖');
            }else if(dataOne.auctionRank==3){
                $('#auctionRank').val('精品拍卖');
            }
        //出价次数       
        $("#bidNumber").val(dataOne.bidNumber);


        getImageShow(data);
        //从服务其获取图片的路径显示图片
        function getImageShow(m){
            var imgs = $(".th-info").find("img");//找到刚才渲染的每个img标签
            if(imgs && imgs.length > 0){
                $.each(imgs,function(i,n){//遍历每一个标签
                    console.log(m[0].img_id);
                    var imageId = m[0].img_id.split(',');//截取获取真正的imgId
                    //远程获取图片地址
                    $.get("/artshop/imageShow/getImageUrlBySize?imgId="+imageId[i]+"&size=150",function(url_){
                        console.log(url_);
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