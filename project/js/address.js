$(function() {

    /*reset*/

    $('#reset').on('click',function () {
        $('#addressinfo').get(0).reset();
        $("#address").val('');
        $("#postCode").val('');
    })





    userid='';
    /*保存数据*/
    $("#save").click(function(){

        save(userid);
    });


    /*获取数据，展示用户的收货地址*/

    $.ajax({
        url: "/artshop/customCenter/getCustomAddress", //请求地址
        /*  data: {"customId": "64435ed"},*/ //提交的数据
        type: "POST", //提交的方式
        success: function(data) {
            var data = JSON.parse(data);
            id = data[0].cust_id;


            var html = '';
            $(data).each(function(i) {

                html += '<li>' + '<div class="con">' + '<span class="con-ico" onclick="setDefaultAddress(\'' + data[i].id + ' \')">设为默认</span>' + ' <p>' + '<i></i><span>' + '<span class="receiveName">' + data[i].receiveName + '</span>' + '</span><i></i><span>' + '<span class="receivePhone">' + data[i].receivePhone + '</span>' + '</span>' + '</p>' + '<p>' + '<i></i><span>地址：' + '<span class="provincee">' + data[i].province + '</span>' + '<span class="citye">' + data[i].city + '</span>' + '<span class="countye">' + data[i].county + '</span>' + '<span class="detailAddresse">' + data[i].detailAddress + '</span>' + '</span>' + '</p>' + '<p>' + '<a href="javascript:void(0)" onclick="edit1(\'' + data[i].id + '\', \'' + data[i].receiveName + '\',\'' + data[i].receivePhone + '\',\'' + data[i].detailAddress + '\',\'' + data[i].postCode + '\',\'' + data[i].province + '\',\'' + data[i].city + '\', \'' + data[i].county + '\')" class="edit"><i></i>编辑</a>|<a href="javascript:void(0)"  onclick="del1(\'' + data[i].id + ' \')" class="del"><i></i>删除</a>' + '</p>' + '</div>' + '<i class="user-id" style="display: none;">' + '<span>' + data[i].id + '</span>' + '</i></li>';



            });


            $('#address_info').append($(html));
            $('#address_info').find('li').eq(0).addClass('on');
        },
        error: function() {
            alert("404");
        }
    })






})


// 获取地区控件所有汉字
$("#distpicker option:checked").text()

// 重置地区控件到第一行(有占位符显示占位符)
$("#distpicker").distpicker('reset', true);

// 地区定位（地名）

function distpickerPositionByAddress(province, city, district) {
    var $province = $("#province");
    var $city = $("#city");
    var $district = $("#district");
    $province.val(province);
    $province.trigger("change");
    $city.val(city);
    $city.trigger("change");
    $district.val(district);
    $district.trigger("change");
}


// 地区定位（编码）
function distpickerPositionByCode(districtCode) {
    var provinceCode = parseInt(parseInt(districtCode) / 10000) * 10000;
    var cityCode = parseInt(parseInt(districtCode) / 100) * 100;
    var $province = $("#province");
    var $city = $("#city");
    var $district = $("#district");
    var province = ChineseDistricts[86][provinceCode];
    var city = ChineseDistricts[provinceCode][cityCode];
    var district = ChineseDistricts[cityCode][districtCode];
    $province.val(province);
    $province.trigger("change");
    $city.val(city);
    $city.trigger("change");
    $district.val(district);
    $district.trigger("change");
}

// 根据地区级别获取编码 1=省；2=市；3=区县
function getDataCode(areaLv) {
    switch (areaLv) {
        case 1:
            return $('#province :selected').attr("data-code");
            break;
        case 2:
            return $('#city :selected').attr("data-code");
            break;
        case 3:
            return $('#district :selected').attr("data-code");
            break;
        default:
            return $('#district :selected').attr("data-code");
    }
}

function del1(id) {
    // var id= $(this).find('.user-id').text();
    $.ajax({
        url: "/artshop/customCenter/deleteAddress", //请求地址
        data: { addressId: id },
        type: "POST", //提交的方式
        success: function(data) {
            if (data == '1') {
                alert("地址删除成功！");
                location.href = "address.html";
                //  $(".del").parents('li').remove();
            } else if (data == '0') {
                alert("地址删除失败！");
            }


        },
        error: function() {
            alert("404");
        }
    })
}




//修改

function edit1(id, name, receivePhone, detailAddress, postCode, province2, city2, district2) {
    // var id= $(this).find('.user-id').text();
    /* $('.edit').each(function (i,v) {*/
  /*  editIs = -editIs;*/
    /* e.preventDefault();*/
    $("#name").val(name);
    $("#phone").val(receivePhone);
    $("#address").val(detailAddress);
    $("#postCode").val(postCode);
    /*$("#province2").val(province2);
    $("#city2").val(city2);
    $("#district2").val(district2);
*/

    $('#province2').val(province2);
    $('#province2').trigger("change");
    $('#city2').val(city2);
    $('#city2').trigger("change");
    $('#district2').val(district2);
    $('#district2').trigger("change");




    userid=id;



    // save(id);
}




//设为默认



function setDefaultAddress(id) {
    $.ajax({
        url: "/artshop/customCenter/setDefaultAddress", //请求地址
        data: { addressId: id },
        type: "POST", //提交的方式
        success: function(data) {
            if (data == '1') {
                alert("默认地址设置成功！");
                location.href = "address.html";
                //  $(".del").parents('li').remove();
            } else if (data == '0') {
                alert("默认地址设置失败！");
            }


        },
        error: function() {
            alert("404");
        }
    })

}


function save(id) {

    /*  e.preventDefault();*/


    /*提交数据检查判断*/


    var si = [
        { receiveName: $("#name").val() },
        { receivePhone: $("#phone").val() },
        { detailAddress: $("#address").val() },
        { postCode: $("#postCode").val() },

        { province: $('#province2').val() },
        { city: $('#city2').val() },
        { county: $('#district2').val() },
    ];

    if (si[0].receiveName == '') {
        alert('请输入姓名');
        return false;
    };

    if (si[1].receivePhone == '' || si[1].receivePhone.length != 11) {
        alert('请输入正确的手机号');
        return false;
    };

    if (si[2].detailAddress == '') {
        alert('请输入详细地址');
        return false;
    };

    if (si[3].postCode == '') {
        alert('请输入邮编');
        return false;
    };


    /*提交数据*/

    if (id) {
        /*保存数据*/
        var addInfo = {

            receiveName: $("#name").val(),
            receivePhone: $("#phone").val(),
            detailAddress: $("#address").val(),
            postCode: $("#postCode").val(),
            id: id,
            province: $('#province2').val(),
            city: $('#city2').val(),
            county: $('#district2').val(),

        }


        $.ajax({
            url: "/artshop/customCenter/updateAddress", //请求地址
            data: addInfo, //提交的数据
            type: "POST", //提交的方式
            success: function(data) {
                if (data == '1') {
                    alert("地址修改成功！");
                    location.href = "address.html";
                } else if (data == '0') {
                    alert("地址修改失败！");
                }


            },
            error: function() {
                alert("404");
            }
        })
    } else {

        /*修改数据*/

        var addInfo = {

            receiveName: $("#name").val(),
            receivePhone: $("#phone").val(),
            detailAddress: $("#address").val(),
            postCode: $("#postCode").val(),

            province: $('#province2').val(),
            city: $('#city2').val(),
            county: $('#district2').val(),

        }

        $.ajax({
            url: "/artshop/customCenter/setAddress", //请求地址
            data: addInfo, //提交的数据
            type: "POST", //提交的方式
            success: function(data) {
                if (data == '1') {
                    alert("新增地址成功！");
                    location.href = "address.html";
                } else if (data == '0') {
                    alert("新增地址失败！");
                }


            },
            error: function() {
                alert("404");
            }
        })


    }


}
