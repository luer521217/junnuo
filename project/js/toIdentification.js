
$(function () {

    var src1=[];
    /*获取数据，*/

    $.ajax({
        url: "/artshop/customCenter/getAppraisers", //请求地址
        async : false,
        type: "POST", //提交的方式
        success: function(data) {
            var data = JSON.parse(data);


            console.log(data);

             var html = '';

             $(data).each(function(i) {

                 putimg(data[i].imagepath);

                console.log(src1);

             html += '<div class="tab1"><div class="order-top  sj-list"><div class="th th-check"><input key="'+data[i].id+'" type="checkbox" name="Appraiser"></div><div class="th th-item"><img src="'+src1[i]+'"  alt=""></div><div class="th th-material">'+data[i].name+'</div><div class="th th-phone">'+data[i].phone+'</div><div class="th th-size">'+data[i].profession+'</div><div class="th th-change">'+data[i].speciality+'</div></div></div>';




             });


             $('#head').after($(html));

            /*获取图片路径*/


            console.log(JSON.parse(src1));

        },
        error: function() {
            alert("404");
        }
    })

    $('#save').on('click',function () {

        var l=$('input[name="Appraiser"]:checked ').length;
        if(l>1){
            alert('只能选一位鉴定师');
            // return false;
        }else if(l==0){
            alert('请选择一位鉴定师');
            return false;
        }

        var ll=$('input[name="public"]:checked ').length;

        if(ll==0){
            alert('请选择是否公开');
            return false;
        }


        var isOpen = $('.public input[name="public"]:checked ').val();
        var id = $('input[name="Appraiser"]:checked ').attr('key');
       /* console.log($('.publicpublic').html());*/
        console.log(isOpen);
        var m=window.location.search.split('=')[1];
       console.log(m);
       console.log(id);

        $.ajax({
            url: "/artshop/customCenter/checkMyArt", //请求地址
            data:{
                art_id:m,
                appraiser_id:id,
                isOpen:isOpen
            },
            type: "POST", //提交的方式
            success: function(data) {
               if(data=='1'){
                   alert('送鉴成功');
                   history.back();
                   location.reload();
               }else{
                   alert('送鉴失败');
               }
            },
            error: function() {
                alert("404");
            }
        })
    })



/*获取图片路径*/
function putimg(path) {

    $.ajax({
        url: "/artshop/imageShow/getImageUrlBySize?imgId="+path+"&size=100", //请求地址
        async : false,
        type: "POST", //提交的方式
        success: function(data) {
            src1.push(data);
            console.log(src1);
        },
        error: function() {
            alert("404");
        }
    });




}









})

