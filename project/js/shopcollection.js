var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getAllArtInStore',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:alldata.length,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.tstoreList;
                    newData.totalRows=alldata.pageInfo.totalCount;
                    newData.curPage=alldata.pageInfo.pageNow;
                }
               return newData;
            }
        });
    });

    function collname(record, rowIndex, colIndex, options) {
        return  '<a href="details__3.html?artId='+gridObj.getRecordIndexValue(record, 'art_id')+'">'+gridObj.getRecordIndexValue(record, 'name')+'</a>';

    }

    function isAppraisal(record, rowIndex, colIndex, options){
        if(record.isAppraisal==0){
           return  '<a href="#" style="color:black;">非鉴定品</a>'
        }else if(record.isAppraisal==1){
            return  '<a href="#" style="cursor:default;color:black;">鉴定品</a>'
        }

        
    }
     function art_status(record, rowIndex, colIndex, options){
       if(record.art_status==0){
           return  '<a href="#" style="cursor:default;color:black;">下架</a>'
        }else if(record.art_status==1){
            return  '<a href="#" style="cursor:default;color:black;">上架</a>'
        }else if(record.art_status==2){
            return  '<a href="#" style="cursor:default;color:black;">待出售</a>'
        }else if(record.art_status==3){
            return  '<a href="#" style="cursor:default;color:black;">已出售</a>'
        }

        
    }

    //操作的渲染
    function operate(record, rowIndex, colIndex, options) {
        var art_id = gridObj.getRecordIndexValue(record, 'art_id');
        var art_status = gridObj.getRecordIndexValue(record, 'art_status');
        var isAppraisal = gridObj.getRecordIndexValue(record, 'isAppraisal');
        if(art_status==0 && isAppraisal ==0){
           return  '<a href="toIdentification.html?artId='+art_id+'"">送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="updates.html?art_id='+gridObj.getRecordIndexValue(record, 'art_id')+'">修改</a>'
        + '&nbsp;&nbsp;' +"<a href='#' onclick='shang(\""+art_id+ "\")'>上架</a>"
         + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">下架</a>';
        }else if(art_status==0 && isAppraisal ==1){
           return  '<a href="#" style= "cursor:default;">已送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="updates.html?art_id='+gridObj.getRecordIndexValue(record, 'art_id')+'">修改</a>'
        + '&nbsp;&nbsp;' +"<a href='#' onclick='shang(\""+art_id+ "\")'>上架</a>"
         + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">下架</a>';
        }else if(art_status==1 && isAppraisal ==0){
           return  '<a href="toIdentification.html?artId='+art_id+'"">送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="updates.html?art_id='+gridObj.getRecordIndexValue(record, 'art_id')+'">修改</a>'
        + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">上架</a>'
         + '&nbsp;&nbsp;' +"<a href='#' onclick='xia_(\""+art_id+ "\")'>下架</a>";
        }else if(art_status==1 && isAppraisal ==1){
           return  '<a href="#" style= "cursor:default;">已送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="updates.html?art_id='+gridObj.getRecordIndexValue(record, 'art_id')+'">修改</a>'
        + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">上架</a>'
         + '&nbsp;&nbsp;' +"<a href='#' onclick='xia_(\""+art_id+ "\")'>下架</a>";
        }else if(art_status==2 && isAppraisal ==0){
            return  '<a href="#" style= "cursor:default;">送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="updates.html?art_id='+gridObj.getRecordIndexValue(record, 'art_id')+'">修改</a>'
        + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">上架</a>'
         + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">下架</a>';
        }else if(art_status==2 && isAppraisal ==1){  
            return  '<a href="#" style= "cursor:default;">已送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="updates.html?art_id='+gridObj.getRecordIndexValue(record, 'art_id')+'">修改</a>'
        + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">上架</a>'
         + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">下架</a>';
        }else if(art_status==3 && isAppraisal ==0){
           return  '<a href="#" style= "cursor:default;">送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">修改</a>'
        + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">上架</a>'
         + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">下架</a>';
        }
        else if(art_status==3 && isAppraisal ==1){
           return  '<a href="#" style= "cursor:default;">已送鉴</a>'
        +  '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">修改</a>'
        + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">上架</a>'
         + '&nbsp;&nbsp;' +'<a href="#" style= "cursor:default;">下架</a>';
        }
        

    }

    
    function shang(art_id){

          $.ajax({
                url:"/artshop/customCenter/changeArtStatus",//请求地址
                data:{id:art_id,art_status:'1'},//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                //  async:false,
                success:function(data){

                    if(data=='1'){
                        alert("提交申请成功！");
	                	location.reload();
	                }else if(data=='0'){
	                	alert("提交申请失败！");
	                }
               }
            })

    }

    function xia_(art_id){

          $.ajax({
                url:"/artshop/customCenter/changeArtStatus",//请求地址
                data:{id:art_id,art_status:'0'},//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                //  async:false,
                success:function(data){

                    if(data=='1'){
                        alert("提交申请成功！");
	                	location.reload();
	                }else if(data=='0'){
	                	alert("提交申请失败！");
	                }
               }
            })

    }


          





