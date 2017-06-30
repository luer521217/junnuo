var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getMyDealLog',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:0,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.tradingRecordList;
                    newData.totalRows=alldata.pageInfo.totalCount;
                    newData.curPage=alldata.pageInfo.pageNow;
                }
               return newData;
            },
            //列表渲染完成之后，的操作。（这里用来获取图片地址）
            // additionalAfterRenderGrid:function(){
            //     //这里使用延时，类似多线程
            //     setTimeout(getImageShow,100);
            // }
        });
    });

      function trade_type(record, rowIndex, colIndex, options){
       if(record.trade_type==1){
           return  '<a href="#" style= "cursor:default;color:black;">扣除保证金</a>'
       }else if(record.trade_type==2){
            return  '<a href="#" style= "cursor:default;color:black;">充值</a>'
        }else if(record.trade_type==3){
            return  '<a href="#" style= "cursor:default;color:black;">竞拍下单</a>'
        }else if(record.trade_type==4){
            return  '<a href="#" style= "cursor:default;color:black;">流拍退款</a>'
        }else if(record.trade_type==5){
            return  '<a href="#" style= "cursor:default;color:black;">缴纳店铺年费</a>'
        }

        
    }

   

          





