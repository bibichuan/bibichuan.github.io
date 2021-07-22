$(document).ready(function(){
    //侧栏内容
    var $side=$(".sidecontent");
    //每日一问
    var $sidecontent=$side.find(".side-ask");
    var $down=$sidecontent.find(".side-footer .down");
    $down.on("click",function(){
        var $this=$(this);
        var $grandfather=$this.parent().parent();
        var $i=$this.find("i")
        if($i.hasClass("icon-packup")){
            $grandfather.find(".heading").removeClass("separate").end()
            .find(".detail").hide();
            // 修改箭头样式
            $i.removeClass("icon-packup").addClass("icon-expansion");
        }else{
            $grandfather.find(".heading").addClass("separate").end()
            .find(".detail").show();
            // 修改箭头样式
            $i.addClass("icon-packup").removeClass("icon-expansion");
        }
    });
    // 使用layui组件
    var $slides=$(".slides-show");
    $slides.find(".blank").remove();
    layui.use(['carousel','flow','layer'], function(){
        //轮播图
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#slide-swrap'
            ,width: '100%' //设置容器宽度
            ,arrow: 'always' //始终显示箭头
            //,anim: 'updown' //切换动画方式
        });

        //图片懒加载
        var flow = layui.flow;
        flow.lazyimg();

        // 小额赞助
        var layer = layui.layer;
        // 获取点击内容
        var $content=$side.find(".side-sponsor .side-content");
        var $img=$content.find("img");
        $content.on("click",function(){
            layer.open({
                title: 0
                ,closeBtn:0
                ,shadeClose:true
                ,content: `<div class="side-content">
                    <div class="heading">本人提供免费与付费咨询服务，感谢您的支持！</div>
                    <div class="content">
                        <img src="${$img.attr("src")}" title="小额赞助"/>
                    </div>
                </div>`
            });     
                
        })
    });
    //更多标签栏
    var $sidetag=$(".sidetag-wrap");
    $sidetag.find(".tag-more").on("mouseenter",function(){
        $sidetag.find(".sidetag-all").show();
    }).on("mouseleave",function(){
        $sidetag.find(".sidetag-all").hide();
    });

    //根据页面高度决定显示标签个数,解决页面高度过小，标签过高出现的标签栏超出底部的问题。其中170为标签的顶部距离页面顶部的距离
    let bodyHeight=document.body.clientHeight;
    let sideTagHeight=$sidetag.height();
    let footerH=$(".footer").height();
    let sideTagTop=parseInt($sidetag.css('top'));
    if(sideTagHeight*1.2+sideTagTop+footerH>bodyHeight){
        let tagArray=$sidetag.find(".sidetag-content > li:not(.tag-more)");
        let $sideall=$sidetag.find(".sidetag-all");
        let $sideall_ul=$sideall.find("ul");
        // 将过多的标签放到更多里面
        for(let i=tagArray.length-1;i>0;i--){
            if(sideTagHeight*1.2+sideTagTop+footerH>bodyHeight){
                let temp=tagArray[i];
                $(temp).appendTo($sideall_ul);
                sideTagHeight=$sidetag.height();
            }else{
                break;
            }
        }
        //如果sidetag_all的高度超过sideTagHeigh的高度，则设置$sideall的顶部位置,借助于jquery.actual插件
        // 这里没有考虑如果sideall很高很高的情况，理论上应该同时增大宽度才可以。
        let sideallHeight=$sideall.actual("height");
        if(sideallHeight>sideTagHeight){
            let top=0;
            let bottom="initial";
            if(sideallHeight+sideTagTop>bodyHeight){
                top=bodyHeight-(sideallHeight+sideTagTop)-20;
            }
            //如果上下都超出了范围
            let width=400;
            if(top<-110){
                top=-110;
                bottom="-40px";
                $sideall_ul.css({"overflow-x":"hidden"});
            }
            $sideall.css({bottom:bottom,top:top+"px",width:width+"px"});
        }
    }
    $sidetag.show();

    // 判断是否是手机端访问
    let device=BTheme.utils.deviceType();
    // 如果是手机端的话，将摘要缩短
    if(device.isAndroid||device.isPhone){
        $(".content .abstract").each(function(index,item){
            item.innerHTML=item.innerHTML.substring(0,100)+".....";
        })
    }
    // 绑定手机端的标签栏
    let bodyEl = document.body;
    let top = 0;
    $(".sidetag-mobile").on("click",function(){
        var $this=$(this);
        var $parent=$this.parent();
        var $sc=$parent.find(".sidetag-m-c");
        if($sc.length<=0){
            let $allTag=$(".sidetag-wrap .sidetag-content li:not(.tag-more)").clone();
            $sc=$("<ul class='sidetag-m-c'></ul>").appendTo($parent);
            $allTag.appendTo($sc);
        }
        $sc.show();
        $parent.find(".close").show();

        // 移动端出现弹出层滚动，底部跟着滚动的问题
        top = window.scrollY
        bodyEl.style.position = 'fixed'
        bodyEl.style.top = -top + 'px'
    });
    //手机端标签关闭
    $(".sidetag-m-wrap .close").on("click",function(){
        var $this=$(this);
        $this.hide().next().hide();

        // 移动端出现弹出层滚动，底部跟着滚动的问题
        bodyEl.style.position = ''
        bodyEl.style.top = ''
        window.scrollTo(0, top) // 回到原先的top
    });

});