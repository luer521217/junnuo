
    var gridObj;//列表对象
    //当document加载完成后
    $(function () {
        //渲染列表控件 searchTable 为table的id
        gridObj = $.fn.bsgrid.init('searchTable', {
            url: '/artshop/customCenter/getAllCollect?id_their=0',//请求数据的url
            pageSizeSelect: false,//是否显示每页条数选择框
            pagingLittleToolbar: true, // 是否显示分页控件
            pageSize: 8,//默认的每页显示条数
            //重现组装列表数据
            makeData:function(alldata){
                var newData={data:[],totalRows:0,curPage:1,success:true};//列表需要的标准数据对象
                //如果获取到了数据，重新组装并返回
                if(alldata){
                    newData.data=alldata.collecArtList;
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
            return '<img src=""  onclick="y_href(\''+ record.artid+ '\')" id="imgId_'+record.img_id.split(',')[0]+'">'
        }else{
            return "<a href='/artshop/storeArtinfo/selectStoreArtDetails?artid="+record.artid+"' target='_blank'>"+record.name+"</a>";
        }

    }
    function y_href(id){//图片链接
    		path="/artshop/storeArtinfo/selectStoreArtDetails?artid="+id;
    		window.location.href=path;
    }
    //操作的渲染
    function operate(record, rowIndex, colIndex, options) {
        var collid = gridObj.getRecordIndexValue(record, 'collid');
        return "<a href='#' id='y_del' onclick='del(\""+ collid+ "\")'>删除</a>";
    }


    function del(collid){
          $.ajax({
                url:"/artshop/customCenter/deleteColl",//请求地址
                data:{collId:collid},//提交的数据
                type:"POST",//提交的方式
                //dataType:"JSONP", //返回类型
                 async:false,
                success:function(data){
                    if(data=='1'){
                        alert("删除成功！");
	                	location.href = "shopping.html";//location.href实现客户端页面的跳转
	                }else if(data=='0'){
	                	alert("删除失败！");
	                }
               }
            })

    }
