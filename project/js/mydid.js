
    var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getMyPiddlingList',//请求数据的url
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
    
    //操作的渲染
    function operate(record, rowIndex, colIndex, options) { 
        return '<a href="details__1.html?aucid='+gridObj.getRecordIndexValue(record, 'aucid')+'">竞拍记录</a>' ;
       
    }

 

    




          





