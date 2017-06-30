function submit(){
    var si=[
            {name: $("#name").val()},
            {texture: $("#texture").val()},
            {epoch: $("#epoch").val()},
            {size: $("#size").val()},
            {weight: $('#weight').val()},
            {amount: $('#amount').val()},         
            {sort_id:$("#y_one").val()},
            {detail_id:$("#y_two").val()},
            {img_id1:$("#img_show1").attr("src")},
            {img_id2:$("#img_show2").attr("src")},
            {img_id3:$("#img_show3").attr("src")},
            {img_id4:$("#img_show4").attr("src")}
        ];
        if(si[0].name==''){
            alert('请输入藏品名称');
            return false;
        };

        if(si[1].texture==''){
            alert('请输入藏品材质');
            return false;
        };

        if(si[2].epoch==''){
            alert('请输入藏品年代');
            return false;
        };

        if(si[3].size==''){
            alert('请输入藏品尺寸');
            return false;
        };

         if(si[4].weight==''){
            alert('请输入藏品重量');
            return false;
        };
         if(si[5].amount==''){
            alert('请输入藏品数量');
            return false;
        };
         if(si[6].sort_id==''){
            alert('请选择一级类别');
            return false;
        };
         if(si[7].detail_id==''){
            alert('请选择二级类别');
            return false;
        };
        if(si[8].img_id1=='images/photo_icon.png'||si[9].img_id2=='images/photo_icon.png'||si[10].img_id3=='images/photo_icon.png'|si[11].img_id4=='images/photo_icon.png'){
            alert('请同时上传四张图片');
            return false;
        };

    var name ,author, size, epoch , amount , sort_id,detail_id,date,weight,texture ,intro,img_id;
    var addInfo = {
        name: $("#name").val(),
        texture :$("#texture").val(),
        epoch :$("#epoch").val(),
        author:$("#author").val(),
        size:$("#size").val(),
        weight:$("#weight").val(),
        amount :$("#amount").val(),
        sort_id:$("#y_one").val(),
        detail_id:$("#y_two").val(),   
        intro :$("#intro").val(),
        img_id:all_imgs.join(",")      
    }
     $.ajax({
                url:"/artshop/customCenter/setMyArt",//请求地址
                data:addInfo,//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                async:true,
                success:function(data){
                    if(data=='1'){
                        alert("添加成功！");
	                	location.href = "CollectionManagement.html";//location.href实现客户端页面的跳转  
	                }else if(data=='0'){
	                	alert("添加失败！");
	                }

               },
                error: function () {
                    alert("404");
                }
    })
}