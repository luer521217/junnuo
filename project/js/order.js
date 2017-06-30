
    var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getSellOrdersByCustid?origin=0',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.sellOrderList;
                    newData.totalRows=alldata.pageInfo.totalCount;
                    newData.curPage=alldata.pageInfo.pageNow;
                }
               return newData;
            },
            //列表渲染完成之后，的操作。（这里用来获取图片地址）
            additionalAfterRenderGrid:function(){
                //这里使用延时，类似多线程
                setTimeout(getImageShow,100);
            }
        });

        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable1', {
            url: '/artshop/customCenter/getSellOrdersByCustid?origin=1',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.sellOrderList;
                    newData.totalRows=alldata.pageInfo.totalCount;
                    newData.curPage=alldata.pageInfo.pageNow;
                }
               return newData;
            },
            //列表渲染完成之后，的操作。（这里用来获取图片地址）
            additionalAfterRenderGrid:function(){
                //这里使用延时，类似多线程
                setTimeout(getImageShow,100);
            }
        });
    });
    //从服务其获取图片的路径显示图片
    function getImageShow(){
        var imgs = $("img[id^='imgId_']");//找到刚才渲染的每个img标签
                if(imgs && imgs.length > 0){
                    $.each(imgs,function(i,n){//遍历每一个标签
                        var imageId = n.id.split("imgId_")[1];//截取获取真正的imgId
                        //远程获取图片地址
                        $.get("/artshop/imageShow/getImageUrlBySize?imgId="+imageId+"&size=100",function(url_){
                            if(url_){
                                $(n).attr("src",url_);//获取到地址后，赋值src，显示图片
                            }
                        })
                    })
                }
    }
    //先渲染图片的标签，待所有列表完成后，再获取图片
    function renderImg(record, rowIndex, colIndex, options){
         if(record.img_id && record.img_id.split(',')[0]){
            return '<img src=""  onclick="y_href(\''+ record.orderid+ '\')" id="imgId_'+record.img_id.split(',')[0]+'">'
        }else{
            return "<a href='shopInfo.html?orderid="+record.orderid+"'>"+record.name+"</a>";
        }
    }
    function y_href(id){//购物车下单结算
    		path="shopInfo.html?orderid="+id;
    		window.location.href=path;
    }
    function operate(record, rowIndex, colIndex, options) {
             var orderid = record.orderid;
             var totalPrice = record.totalPrice || 0;
            return "<a href='javascript:void(0)' onclick=showUpdatePriceWin('"+orderid+"','"+totalPrice+"')>修改价格</a>"
            + "&nbsp;&nbsp;<a href='javascript:void(0)' onclick=showSure('"+orderid+"','"+totalPrice+"')>确认付款</a>";
    }
    function operate1(record, rowIndex, colIndex, options) {
             var orderid = record.orderid;
             var totalPrice = record.totalPrice;
            return "<a href='shopInfo.html?orderid="+record.orderid+"')'>查看详情</a>";
    }
    //修改价格
    var update_totalPrice,update_orderid;
    function showUpdatePriceWin(orderid,totalPrice){
        update_orderid = orderid;
        update_totalPrice = totalPrice;
        //$("#racePop").show(300);
        var newPrice=prompt("请输入新的价格",totalPrice);
        if(newPrice){
            update_totalPrice = newPrice;
            update_();
        }else{
            alert("新价格不能为空");
        }
       
    }
    //确认付款
    var sure_totalPrice,sure_orderid;
    function showSure(orderid,totalPrice){
        sure_orderid = orderid;
        sure_totalPrice = totalPrice;
        if(confirm("确认付款吗？")){
            
            sure_();
        }else{
            return;
        }
       
    }

     function sure_(){
            
           // var price = $("#price").val(totalPrice);
    		$.ajax({
                url:"/artshop/customCenter/updateOrder",//请求地址
                data:{id:sure_orderid,totalPrice:sure_totalPrice,oraderStatus:'1',flag:'zhifu'},//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                async:false,
                success:function(data){
                    if(data=='1'){
                        alert("已确认付款");
                        window.location.reload();
	                }else if(data=='0'){
	                	alert("确认付款失败！");
	                }
               }
            })
    }

    function update_(){
            
         
    		$.ajax({
                url:"/artshop/customCenter/updateOrder",//请求地址
                data:{id:update_orderid,totalPrice:update_totalPrice,flag:'jiage'},//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                async:false,
                success:function(data){
                    if(data=='1'){
                        alert("改价成功！");
                      //   window.location.reload();
	                }else if(data=='0'){
	                	alert("改价失败！");
	                }
               }
            })
    }


    function oraderStatus(record, rowIndex, colIndex, options){
       if(record.oraderStatus==0){
           return  '<a href="#" style= "cursor:default;color:black;">待付款</a>'
       }else if(record.oraderStatus==1){
            return  '<a href="#" style= "cursor:default;color:black;">已付款</a>'
        }     
    }
   

   function info(record, rowIndex, colIndex, options) {

        var name = record.name;
        var texture =  record.texture;
        var epoch =  record.epoch;
        return name+"&nbsp;&nbsp;"+texture+"&nbsp;&nbsp;"+epoch;

    }

