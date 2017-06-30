
function Join_my(array,flag){
    var aNew = [];
    if(array && array.length > 0){
        for(var i = 0;i<array.length;i++){
            var a = array[i];
            if(a){
                aNew.push(a);
            }
        }
    }
    return aNew.join(flag);
}
$(function(){
  $.ajax({
    url:"/artshop/customCenter/getCustomInfo",//请求地址
    //data:{customId:'64435ed'},//提交的数据
    type:"POST",//提交的方式
    dataType:"JSON", //返回类型
    success:function(data){
        //姓名
        var name = data.name;
        $("#name").val(name);
         //年龄
        var age = data.age;
        $("#age").val(age);
        //生日
        var birthday= data.birthday.split("-");
        var year=birthday[0];
        var month=birthday[1];
        var day=birthday[2];
        $("#sel_year").val(year);
         $("#sel_month").val(month);
          $("#sel_day").val(day);
        //var year=birthday[0];
        // $("#sel_year  option[value='"+year+"'] ").attr("selected",true);
        //var month=parseInt(birthday[1]);
        // $("#sel_month  option[value='"+month+"'] ").attr("selected",true);
        //var day=parseInt(birthday[2]);
        // $("#sel_day  option[value='"+day+"'] ").attr("selected",true);
        $("#sel_year").val(year);
         $("#sel_month").val(month);
          $("#sel_day").val(day);
        //性别
        var sex = data.sex;
        $("input[name='radio1']").each(function(){
                var value = $(this).val();      //获得值
                if(value == sex){
                    $(this).attr("checked",true);   //选中，不选中 是false
                }

            });
        //电话
        var phone = data.phone;
        $("#phone").val(phone);
         //qq
        var qq = data.qQ;
        $("#qq").val(qq);
        //微信
        var wechat = data.weChat;
        $("#wechat").val(wechat);
        //地址
        var address = data.address;
        $("#address").val(address);
        //状态
        var auditStatus = data.auditStatus;
         $("input[name='radio2']").each(function(){
                var value = $(this).val();      //获得值
                if(value == auditStatus){
                    $(this).attr("checked",true);   //选中，不选中 是false
                }

            });


         if(data.idcard){
             var d = data.idcard.split(',');
             if( d.length > 0){
                all_imgs = d;
             }
         }
        getImageShow(data);
        //从服务其获取图片的路径显示图片
        function getImageShow(m){
            var imgs = $("#grxxtu").find("img");//找到刚才渲染的每个img标签
            if(imgs && imgs.length > 0){
                $.each(imgs,function(i,n){//遍历每一个标签
                    var imageId = m.idcard.split(',');//截取获取真正的imgId
                    //远程获取图片地址
                    $.get("/artshop/imageShow/getImageUrl?imgId="+imageId[i],function(url_){
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

$(function(){
    $("#save").click(function(){

        /*判断姓名*/

        if ($("#name").val()=='') {
            alert('请输入姓名');
            return false;
        }

        /*判断年龄*/


        if ($("#age").val()==''||parseInt($("#age").val())<0) {
            alert('请输入正确的年龄');
            return false;
        }


        /*判断电话*/
         if($("#phone").val()==''||$("#phone").val().length!=11){
            alert('请输入正确的手机号');
            return false;
        };

        /*判读微信*/
          if ($("#wechat").val()=='') {
            alert('请输入微信');
            return false;
        }

        /*判断地址*/
        if ($("#address").val()=='') {
            alert('请输入地址');
            return false;
        }


        /*判断qq*/
        var patt1=new RegExp(/[1-9][0-9]{4,}/);
        var f=patt1.test($("#qq").val());
        if(!f){
            alert("qq格式不对，请重新输入！")
            return false;
        }

           /*判断年分*/
         if($("#sel_year").val()==''||$("#sel_year").val().length!=4){
            alert('请输入正确的年份');
            return false;
        };

            /*判断月分*/
         if($("#sel_month").val()==''||$("#sel_month").val().length!=2){
            alert('请输入正确的月份，格式为‘01’或‘22’');
            return false;
        };

    /*判断日期*/
         if($("#sel_day").val()==''||$("#sel_day").val().length!=2){
            alert('请输入正确的日期，格式为‘01’或‘22’');
            return false;
        };







     var name,age,sex,phone,qq,wechat,address,year,month,day,birthday;
     year = $("#sel_year").val();
     month=  $("#sel_month").val();
     day=  $("#sel_day").val();
     birthday  = year +"-"+month+"-"+day;
     var addInfo = {
        id:'64435ed',
        name: $("#name").val(),
        age : $("#age").val(),
        birthday:birthday ,
        sex :$("input[name='radio1']:checked").val(),
        phone :$("#phone").val(),
        QQ :$("#qq").val(),
        weChat:$("#wechat").val(),
        address :$("#address").val(),
        //auditStatus :$("input[name='radio2']:checked").val(),
        idcard: Join_my(all_imgs,",")
    }
    //var addInfoStr = JSON.stringify(addInfo);
  $.ajax({
    url:"/artshop/customCenter/setCustomInfo",//请求地址
    data:addInfo,//提交的数据
    type:"POST",//提交的方式
    success:function(data){
        if(data=='1'){
	        alert("保存成功！");
	    }else if(data=='0'){
	        alert("保存失败！");
	    }


    },
    error:function(){
        alert("404");
    }
  })
})
})
