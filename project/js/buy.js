
    var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/selectBuyOrdersWithCustid',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.buyOrderList;
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
        gridObj = $.fn.bsgrid.init('searchTable1', {
            url: '/artshop/customCenter/selectBuyOrdersWithCustid?oraderStatus=0',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.buyOrderList;
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
        gridObj = $.fn.bsgrid.init('searchTable2', {
            url: '/artshop/customCenter/selectBuyOrdersWithCustid?oraderStatus=1',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.buyOrderList;
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
        // debugger
        if(record.img_id && record.img_id.split(',')[0]){
            return '<img src="" onclick="y_href(\''+ record.artid+ '\')" id="imgId_'+record.img_id.split(',')[0]+'">'
        }else{
            return "<a href='/artshop/storeArtinfo/selectStoreArtDetails?artid="+record.artid+"' target='_blank'>"+record.name+"</a>";
        }


    }

     function y_href(id){//购物车下单结算
    		path="/artshop/storeArtinfo/selectStoreArtDetails?artid="+id;
    		window.location.href=path;
    }
    function oraderStatus(record, rowIndex, colIndex, options){
       if(record.oraderStatus==0){
           return  '<a href="#" style= "cursor:default;color:black;">待付款</a>'
       }else if(record.oraderStatus==1){
            return  '<a href="#" style= "cursor:default;color:black;">已付款</a>'
        }     
    }
    function origin(record, rowIndex, colIndex, options){
       if(record.origin==0){
           return  '<a href="#" style= "cursor:default;color:black;">店铺订单</a>'
       }else if(record.origin==1){
            return  '<a href="#" style= "cursor:default;color:black;">拍卖订单</a>'
        }     
    }