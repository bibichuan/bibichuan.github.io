$(document).ready(function(){var t=document.querySelector(".grid"),i=(new Masonry(t,{itemSelector:".grid-item",gutter:20,fitWidth:!0}),$(".grid-item"));layui.use(["rate","layer","carousel","flow"],function(){var r=layui.rate,t=$(".cover-bottom .rate"),e=($(t).each(function(t,e){var a=e.getAttribute("data-mark");r.render({elem:"#"+e.id,value:a/2,readonly:!0,half:!0})}),layui.layer),a=(i.find(".detail_btn").on("click",function(){var t=$(this).attr("data-index");e.open({type:1,title:"观后感",area:"80%",content:$(".detail-wrap."+t),success:function(t,e){t[0]&&t[0].querySelectorAll("img").forEach(function(t){t.getAttribute("lay-src")&&(t.src=t.getAttribute("lay-src"))})}})}),layui.carousel);$(".layui-carousel").each(function(t,e){a.render({elem:"#"+e.id,width:"100%",arrow:"always"})}),layui.flow.lazyimg()}),$(".cover").on("mouseenter",function(){$(this).find(".title").show()}).on("mouseleave",function(){$(this).find(".title").hide()}),$(".detail-wrap .pic-wrap img").not("[hidden]").each(function(){var t,e=$(this),a=e.attr("title"),r=e.parent("a");r.length<1&&(t=e.attr("lay-src")?this.getAttribute("lay-src"):this.getAttribute("src"),r=e.wrap('<a data-fancybox="group" href="'+t+'"></a>').parent("a")),r.addClass("fancybox fancybox.image"),r.attr("rel","group"),a&&r.attr("title",a)}),$(".fancybox").fancybox({backFocus:!1,hash:!1,hideScrollbar:!0})});