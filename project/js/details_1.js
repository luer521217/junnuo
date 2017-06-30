var urlTools = {
    //获取RUL参数值
    getUrlParam: function(name) {               /*?videoId=identification  */
        var params = decodeURI(window.location.search);        /* 截取？号后面的部分    index.html?act=doctor,截取后的字符串就是?act=doctor  */
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = params.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
};
var aucid_ = urlTools.getUrlParam("aucid");  // 获取url中的参数
var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getMyAuctionRecord?auctionId='+aucid_,//请求数据的url
            pageSizeSelect: true,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata;
                    //newData.totalRows=alldata.pageInfo.totalCount;
                    //newData.curPage=alldata.pageInfo.pageNow;
                }
                
               return newData;
            }
            //列表渲染完成之后，的操作。（这里用来获取图片地址）
            // additionalAfterRenderGrid:function(){
            //     //这里使用延时，类似多线程
            //     setTimeout(getImageShow,100);
            // }
        });
    });
    function formatDate(record, rowIndex, colIndex, options){
        var date = gridObj.getRecordIndexValue(record, 'bidTime');
        if(!isNaN(date)){
            var date_  = new Date(parseInt(date));
            return date_.getFullYear()+"-"+(date_.getMonth()+1)+"-"+date_.getDate()+" "+date_.getHours()
            +":"+date_.getMinutes()+":"+date_.getSeconds();
        }
    }