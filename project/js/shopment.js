$(function() {
    $.ajax({
        url: "/artshop/customCenter/getOneStore", //请求地址
        //data:{customId:'64435ed'},//提交的数据
        type: "POST", //提交的方式
        dataType: "JSON", //返回类型
        success: function(data) {
            console.log(data);
            // if(!data || data.length < 1){
            //     return;
            // }
            // var dataOne = data[0];
            //店铺logo
            var storePortrait = data.storePortrait;
            //店铺id
            var stid = data.stid;
            //店铺名称
            var storename = data.storename;


            $("#storename").val(storename);
            if (storename == '') {
                $('#shop_info').hide();
            }



            //店铺主营
            var mianProducts = data.mianProducts;
            $("#mianProducts").val(mianProducts);
            //店铺级别
            $("#rankname").val(data.rankname);

            //开店时间
            $("#openTime").val(Verifidate(data.openTime));
            //年费到期时间
            $("#deadline").val(Verifidate(data.deadline));
            //点击量
            $("#hits").val(data.hits);
            //年费
            $("#annuity_cost").val(data.annuity_cost);
            //冻结状态
            if (data.del_status == 0) {
                $('#del_status').val('冻结');
            } else if (data.del_status == 1) {
                $('#del_status').val('正常');
            }
            //升级状态
            if (data.isupgrade == 0) {
                $('#isupgrade').val('待升级处理');
            } else if (data.isupgrade == 1) {
                $('#isupgrade').val('已升级');
                /* $("#upgrade").preventDefault();*/
                /*$("#upgrade").unbind("click");*/
            }
            //缴费状态
            if (data.isPayUpgrade == 0) {
                $('#isPayUpgrade').val('已缴费');
            } else if (data.isPayUpgrade == 1) {
                $('#isPayUpgrade').val('未交费');
            }
            //是否缴年费
            if (data.isPay_annuity == 0) {
                $('#isPay_annuity').val('已缴年费');
            } else if (data.isPay_annuity == 1) {
                $('#isPay_annuity').val('未交费');
            }
            //店铺状态
            if (data.auditStatus == 0) {
                $('#auditStatus').val('未审核');
            } else if (data.auditStatus == 1) {
                $('#auditStatus').val('待审核');
            } else if (data.auditStatus == 2) {
                $('#auditStatus').val('审核通过');
            } else if (data.auditStatus == 3) {
                $('#auditStatus').val('审核未通过');
            }
            //年费缴纳时间
            $("#payTime").val(Verifidate(data.payTime));

            //主营
            var a = data.mianProducts.split(' ');
            console.log(a);

            $('input[name="zhuying"]').each(function(i) {
                $that = $(this);
                $(a).each(function(J, v) {
                    if ($that.val() == v) {
                        $that.attr('checked', 'checked');
                    }
                })
            })



            getImageShow(data);
            //从服务其获取图片的路径显示图片
            function getImageShow(m) {
                var imgs = $("#grxxtu").find("img"); //找到刚才渲染的每个img标签
                if (imgs && imgs.length > 0) {
                    $.each(imgs, function(i, n) { //遍历每一个标签
                        console.log(m.storePortrait);
                        var imageId = m.storePortrait.split(','); //截取获取真正的imgId
                        //远程获取图片地址
                        $.get("/artshop/imageShow/getImageUrlBySize?imgId=" + imageId[i] + "&size=100", function(url_) {
                            console.log(url_);
                            if (url_) {
                                $(n).attr("src", url_); //获取到地址后，赋值src，显示图片

                            }
                        })
                    })
                }
            }
            //申请升级
            $("#upgrade").click(function() {
                    if ($('#isupgrade').val() == '已升级') {
                        return false;
                    }
                    $.ajax({
                        url: "/artshop/customCenter/storeUpgrade", //请求地址
                        data: { storeId: stid, isupgrade: '0', isPayUpgrade: '1' }, //提交的数据
                        type: "POST", //提交的方式
                        success: function(data) {
                            if (data == '1') {
                                alert("提交申请成功！");
                            } else if (data == '0') {
                                alert("提交申请失败！");
                            } else {
                                alert(data);
                            }

                        },
                        error: function() {
                            alert("404");
                        }
                    })
                })
                //我要开店
            $(".kaidian").click(function() {

                if ($('#storename').val() != '') {


                    alert('您已经有店铺，无需再开店');

                    return false;
                } else {
                    $('#shop_info').hide();
                }


            })

        },
        error: function() {
            alert("404");
        }
    })


})

function Verifidate(date) {
    if (!isNaN(date)) {
        var date_ = new Date(parseInt(date));
        return date_.getFullYear() + "-" + (date_.getMonth() + 1) + "-" + date_.getDate() + " " + date_.getHours() + ":" + date_.getMinutes() + ":" + date_.getSeconds();
    }
}
