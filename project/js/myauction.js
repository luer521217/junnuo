
    var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getMyAuctions',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:0,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.tAuctionList;
                    newData.totalRows=alldata.pageInfo.totalCount;
                    newData.curPage=alldata.pageInfo.pageNow;
                }
               return newData;
            }
        });
    });
    //拍卖状态的判断
    function Status(record, rowIndex, colIndex, options){    
        if(record.auctionStatus==0){

          return  '<a href="#" style="cursor:default;color:black;">拍卖预展</a>' 

        }else if(record.auctionStatus==1){

          return  '<a href="#" style="cursor:default;color:black;">正在拍卖</a>'
     
        }else if(record.auctionStatus==2){

             return  '<a href="#" style="cursor:default;color:black;">拍卖结束</a>'
         
        }else if(record.auctionStatus==3){

                 return  '<a href="#" style="cursor:default;color:black;">流拍</a>'
         
        }
        
    }
    //操作的渲染
    function operate(record, rowIndex, colIndex, options) {
   
        return '<a href="paiMaiInfo.html?auctionId='+gridObj.getRecordIndexValue(record, 'aucid')+'">详情</a>' ;
       
    }

 

    




          





