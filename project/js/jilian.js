var classData;

$(function () {
    var yiji = $("#y_one");
    var erji = $("#y_two");
    //找到下拉框 
    $.ajax({
        url: "/artshop/customCenter/getSortinfo", //请求地址
        type: "POST", //提交的方式
        dataType: "JSON", //返回类型
        success: function (data) {
            if (data && data.length > 0) {
                classData = data;
                for (var i = 0; i < classData.length; i++) {
                    $("<option value =' " + classData[i].id + " '> " + classData[i].sortName + "</option>").appendTo(yiji);
                }
                var currentOne = classData[0].detailInfos;
                for (var k = 0; k < currentOne.length; k++) {
                    var currentOpt = currentOne[k];
                    $("<option value =' " + currentOpt.id + " '> " + currentOpt.detailName + "</option>").appendTo(erji);
                }
            }

        },
        error: function () {
            alert("404");
        }
    });
    yiji.change(function () {
        var classOne = yiji.val();
        for (var j = 0; j < classData.length; j++) {
            if (classOne == classData[j].id) {
                erji.html("");
                var currentOne = classData[j].detailInfos;
                for (var k = 0; k < currentOne.length; k++) {
                    var currentOpt = currentOne[k];
                    $("<option value =' " + currentOpt.id + " '> " + currentOpt.detailName + "</option>").appendTo(erji);
                }
                break;
            }
        }
    })
})