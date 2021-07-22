$(document).ready(function(){
    layui.use(['layer','laypage'], function(){
        var laypage = layui.laypage;
        var layer=layui.layer;

        let pagination_wrap=document.querySelector(".pagination_wrap");
        let pagination=pagination_wrap.dataset;
        let currpate=pagination.current;
        let totalpage=pagination.totalpage;
        let size=pagination.perpage;
        let total=totalpage*size;
        //判断手机还是PC
        let pageGroups=5;
        let prev="上一页";
        let next="下一页";
        if(window.screen.width<768){
            pageGroups=3;
            prev="<i class='iconfont icon-prev'></i>";
            next="<i class='iconfont icon-next'></i>";
        }

        //执行一个laypage实例
        laypage.render({
            elem: 'pagina' 
            ,count:total 
            ,limit:size
            ,curr:currpate
            ,groups:pageGroups
            ,prev:prev
            ,next:next
            ,jump: function(obj, first){
                //首次不执行
                if(!first){
                    let href=location.href;
                    let patt = /page\/\d+/i;
                    var repStr="page/"+obj.curr;
                    if(patt.test(href)){
                        if(obj.curr<=1){
                            href=href.replace(/page\/\d+\//i,"");
                        }else{
                            href=href.replace(/page\/\d+/i,repStr)
                        }
                        
                    }else{
                        href+=repStr;
                    }
                    layer.load();
                    window.open(href,"_self");
                }
            }
        });
    });
});