BTheme.utils=BTheme.$u={noscroll:function(e){var n=document.body,o=$(".main").data("top");e?(o=window.scrollY,$(".main").data("top",o),n.style.position="fixed",n.style.top=-o+"px"):(n.style.position="",n.style.top="",window.scrollTo(0,o))},deviceType:function(){var e=navigator.userAgent,n=/(?:Windows Phone)/.test(e),n=/(?:SymbianOS)/.test(e)||n,o=/(?:Android)/.test(e),i=/(?:Firefox)/.test(e),i=(/(?:Chrome|CriOS)/.test(e),/(?:iPad|PlayBook)/.test(e)||o&&!/(?:Mobile)/.test(e)||i&&/(?:Tablet)/.test(e)),e=/(?:iPhone)/.test(e)&&!i;return{isTablet:i,isPhone:e,isAndroid:o,isPc:!e&&!o&&!n}},layuiFlow:function(){layer&&layui.use(["flow"],function(){layui.flow.lazyimg()})}},$(document).ready(function(){document.oncopy=function(){return!1},document.oncut=function(){return!1},document.onpaste=function(){return!1},layui.use("element",function(){layui.element}),$(".menu-item .nav-child").on("mouseenter",function(){$(this).find(".nav-more").addClass("nav-mored").end().find(".nav-child-child").show()}).on("mouseleave",function(){$(this).find(".nav-more").removeClass("nav-mored").end().find(".nav-child-child").hide()}),$(".icon-menu").on("click",function(){var e=$(this);e.hasClass(".site-nav-show")?(e.removeClass(".site-nav-show"),$(".site-nav").hide(),BTheme.utils.noscroll(!1)):(e.addClass(".site-nav-show"),$(".site-nav").show(),BTheme.utils.noscroll(!0))}),$(".side-tool .side-icon-wrap").on("click",function(){$(this).hide().next().show()}),$(".side-tool .side-close").on("click",function(){$(this).parent().hide().prev().show()})});