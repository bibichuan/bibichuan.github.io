$(document).ready(function(){layui.use(["layer","laypage"],function(){var e=layui.laypage,i=layui.layer,a=document.querySelector(".pagination_wrap").dataset,n=a.current,r=a.perpage,o=5,t="上一页",c="下一页";window.screen.width<768&&(o=3,t="<i class='iconfont icon-prev'></i>",c="<i class='iconfont icon-next'></i>"),e.render({elem:"pagina",count:a.totalpage*r,limit:r,curr:n,groups:o,prev:t,next:c,jump:function(e,a){var n;a||(a=location.href,n="page/"+e.curr,/page\/\d+/i.test(a)?a=e.curr<=1?a.replace(/page\/\d+\//i,""):a.replace(/page\/\d+/i,n):a+=n,i.load(),window.open(a,"_self"))}})})});