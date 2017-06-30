var stid;
$(function () {

    $.ajax({
        url: "/artshop/customCenter/getOneStore",//请求地址
        type: "POST",//提交的方式
        dataType: "JSON", //返回类型
        async: false,
        success: function (data) {

            stid = data.stid;

        },
        error: function () {

        }
    })
    //alert(stid)
    $("#save").click(function () {

        var name, storePortrait, mianProducts;


        var zhuying = "";
        $("input:checkbox[name='zhuying']:checked").each(function () {
            zhuying += $(this).val() + " ";

        });

        if(zhuying == ""){
            alert('请选择店铺主营');
            return false;
      }

        if($("#storename").val() == ""){
            alert('请输入店铺名称');
            return false;
        }

        var logo=$('#img_show1').attr('src');
        if(logo=='images/photo_icon.png'){
            alert('请上传店铺logo');
            return false;
        }

        var addInfo = {
            id: stid,
            name: $("#storename").val(),
            storePortrait: all_imgs.join(","),
            mianProducts: zhuying
        }

        $.ajax({
            url: "/artshop/customCenter/updateStore",//请求地址
            data: addInfo,//提交的数据
            type: "POST",//提交的方式
            success: function (data) {
                if (data == '1') {
                    alert("修改成功！");
                } else if (data == '0') {
                    alert("修改失败！");
                }


            },
            error: function () {
                alert("404");
            }
        })
    })
})