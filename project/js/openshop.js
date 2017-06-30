
$(function(){
$("#save").click(function(){

    


   var storename=$('#name').val();
   console.log(storename);



    var mianProducts="";
    $("input[name='ziying']:checked").each(function() {
        mianProducts += $(this).val() + " ";

    });




    /*店铺名称非空判断*/
if(storename==''|storename=='中华古玩网'){
    alert('请输入店铺名称')
    return false;
}


    /*图片非空判断*/

    var f=$('#img_show1').attr('src');
    if(f=='images/photo_icon.png'){
        alert('请点击上传图片');
        return false;
    }

    /*多选框非空判断*/

if(mianProducts==''){
    alert('请选择店铺主营');
    return false;
}





    $.ajax({
     url:"/artshop/customCenter/createStore",//请求地址
     data:{name:storename,storePortrait:all_imgs[0] ,mianProducts:mianProducts},//提交的数据
     type:"POST",//提交的方式
     success:function(data){

 alert(data);

     if(data=='1'){
     alert("提交申请成功！");
     }else if(data=='0'){
     alert("提交申请失败！");
     }else{
     alert(data);
     }

     },
     error:function(){
     alert("404");
     }
     })
 })
})