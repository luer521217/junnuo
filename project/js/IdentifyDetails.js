
 $(function () {
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
     $.ajax({
         url: "/artshop/customCenter/getMyAppraiserArt",//请求地址
         data:{artId:artId},//提交的数据
         type: "POST",//提交的方式
         success: function (data) {



             var data = JSON.parse(data);

             console.log(data);




             $('#name').val(data[0].name);
             $('#texture').val(data[0].texture);
             $('#epoch').val(data[0].epoch);
             $('#evaluate').val(data[0].evaluate);
             $('#cost').val(data[0].cost);

             if(data[0].prove_status==1){
                 $('#status').val('待鉴定');
             }else if(data[0].prove_status==2){
                 $('#status').val('初步鉴定');
             }else if(data[0].prove_status==3){
                 $('#status').val('初步鉴定');
             }else if(data[0].prove_status==4){
                 $('#status').val('鉴定通过');
             }else if(data[0].prove_status==5){
                 $('#status').val('鉴定未通过');
             }


             var tt=formatDate(data[0].submitTime);


             $('#submitTime').val(tt);
             //$('#date').val(data[0].texture);
             $('#startDate').val(data[0].startDate);
             $('#endDate').val(data[0].endDate);

             if(data[0].isOpen=='0'){
                 $('#public').val('不可查看');
             }else{
                 $('#public').val('可以在专家鉴定看到鉴定商品');
             }

             if(data[0].isfess=='0'){
                 $('#Payment').val('未缴费');
             }else{
                 $('#Payment').val('已缴费');
             }

             if(data[0].isture=='0'){
                 $('#isture').val('真');
             }else if(data[0].isture=='1'){
                 $('#isture').val('假');
             }


             if(data[0].artworkRank=='0'){
                 $('#artworkRank').val('精品');
             }else if(data[0].artworkRank=='1'){
                 $('#artworkRank').val('珍品');
             }else if(data[0].artworkRank=='2'){
                 $('#artworkRank').val('一般');
             }

         },
         error: function () {
             alert("404");
         }
     })
     function formatDate(date){
         if(!isNaN(date)){
             var date_  = new Date(parseInt(date));
             return date_.getFullYear()+"-"+(date_.getMonth()+1)+"-"+date_.getDate()+" "+date_.getHours()
                 +":"+date_.getMinutes()+":"+date_.getSeconds();
         }
     }
 })







