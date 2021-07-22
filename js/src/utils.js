BTheme.utils=BTheme.$u={
  noscroll:function(isScroll){
    let bodyEl = document.body
    let top = $(".main").data("top");

    if (isScroll) {
      top = window.scrollY;
      $(".main").data("top",top);
  
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = -top + 'px';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
  
      window.scrollTo(0, top); // 回到原先的top
    }
  },
  //判断手机还是PC
  deviceType:function(){
    var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone, 
    isAndroid = /(?:Android)/.test(ua), 
    isFireFox = /(?:Firefox)/.test(ua), 
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
    return {
         isTablet: isTablet,
         isPhone: isPhone,
         isAndroid : isAndroid,
         isPc : isPc
    };
  },
  //使用layui.flow实现图片懒加载
  layuiFlow:function(){
    if(layer){
      //模块化加载layUi
      layui.use(['flow'], function(){
        //图片懒加载
        var flow = layui.flow;
        flow.lazyimg();
      });
    }
  }
}
$(document).ready(function(){
  // // 禁止复制
  // document.oncopy = function(){ return false; };
  // // 禁止剪切
  // document.oncut = function(){ return false; };
  // // 禁止粘贴
  // document.onpaste = function(){ return false; };
  
  //注意：导航 依赖 element 模块，否则无法进行功能性操作
  layui.use('element', function(){
    var element = layui.element;
  });
  $(".menu-item .nav-child").on("mouseenter",function(){
    var $this=$(this);
    $this.find(".nav-more").addClass("nav-mored").end().find(".nav-child-child").show();
  }).on("mouseleave",function(){
    var $this=$(this);
    $this.find(".nav-more").removeClass("nav-mored").end().find(".nav-child-child").hide();
  });
  //响应式菜单
  $(".icon-menu").on("click",function(){
    var $this=$(this);
    if($this.hasClass(".site-nav-show")){
      $this.removeClass(".site-nav-show")
      $(".site-nav").hide();
       //弹出遮罩层后禁止遮罩层下方的内容滚动
       //$(".main").removeClass("noscroll");
       BTheme.utils.noscroll(false);
    }else{
      $this.addClass(".site-nav-show")
      $(".site-nav").show();
      //弹出遮罩层后禁止遮罩层下方的内容滚动
      //$(".main").addClass("noscroll");
      BTheme.utils.noscroll(true);
    }
  });
  //响应式侧边工具条
  $(".side-tool .side-icon-wrap").on("click",function(){
      var $this=$(this);
      $this.hide().next().show();
  });
  $(".side-tool .side-close").on("click",function(){
    var $this=$(this).parent();
    $this.hide().prev().show();
  });
});