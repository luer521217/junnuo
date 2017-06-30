var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getMyAppraiserArtList',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:0,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.apArtList;
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
    //先渲染图片的标签，待所有列表完成后，再获取图片
    function isfess(record, rowIndex, colIndex, options){
        if(record.isfess==0){
           return  '<a href="#" style= "cursor:default"><font color=black>未交费</a>'
        }else if(record.isfess==1){
            return  '<a href="#" style= "cursor:default"><font color=black>已缴费</a>'
        }


    }
     function prove_status(record, rowIndex, colIndex, options){
       if(record.prove_status==0){
           return  '<a href="#" style= "cursor:default"><font color=black>未鉴定</a>'
       }else if(record.prove_status==1){
           return  '<a href="#" style= "cursor:default"><font color=black>待鉴定</a>'
       }else if(record.prove_status==2){
            return  '<a href="#" style= "cursor:default"><font color=black>初步鉴定</a>'
        }else if(record.prove_status==3){
            return  '<a href="#" style= "cursor:default"><font color=black>专家鉴定</a>'
        }else if(record.prove_status==4){
            return  '<a href="#" style= "cursor:default"><font color=black>鉴定通过</a>'
        }else if(record.prove_status==5){
            return  '<a href="#" style= "cursor:default"><font color=black>鉴定未通过</a>'
        }


    }

    //操作的渲染
    function operate(record, rowIndex, colIndex, options) {
        var artid = gridObj.getRecordIndexValue(record, 'artid');
        var isAuction = gridObj.getRecordIndexValue(record, 'isAuction');
        var prove_status = gridObj.getRecordIndexValue(record, 'prove_status');

          if(isAuction == 0){
            return  '<a href="IdentifyDetails.html?artId='+ artid + '">详情</a>'
            +  '&nbsp;&nbsp;' +"<a href='#' style='cursor:default;'>非拍品</a>";
          }else if(isAuction == 1){
              if(prove_status == 4){
                  return  '<a href="IdentifyDetails.html?artId='+ artid + '">详情</a>'
                  +  '&nbsp;&nbsp;' +"<a href='#' onclick='Send(\""+artid+ "\")' id='send'>送拍</a>";
                }
          }
    }


    function Send(artid){

          $.ajax({
                url:"/artshop/customCenter/moveToAuction",//请求地址
                data:{artId:artid},//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                //  async:false,
                success:function(data){
                    if(data=='1'){
                        alert("送拍成功！");
                        //$("#send").html("已送拍");
	                	location.href = "myCollection.html";//location.href实现客户端页面的跳转
	                }else if(data=='0'){
	                	alert("送拍失败！");
	                }
               }
            })

    }
