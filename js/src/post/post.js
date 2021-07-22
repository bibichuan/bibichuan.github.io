var PostFunction ={

  /**
   * Wrap images with fancybox support.
   */
  wrapImageWithFancyBox: function() {
    $('.post img')
      .not('[hidden]')
      .not('.group-picture img, .post-gallery img')
      .each(function() {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.length < 1) {
          var imageLink = $image.attr('data-original') ? this.getAttribute('data-original') : this.getAttribute('src');
          $imageWrapLink = $image.wrap('<a data-fancybox="group" href="' + imageLink + '"></a>').parent('a');
        }

        $imageWrapLink.addClass('fancybox fancybox.image');
        $imageWrapLink.attr('rel', 'group');

        if (imageTitle) {
          //$imageWrapLink.append('<p class="image-caption">' + imageTitle + '</p>');

          //make sure img title tag will show correctly in fancybox
          $imageWrapLink.attr('title', imageTitle);
        }
      });
    $('.fancybox').fancybox({
      backFocus:false
      ,hash: false
      ,hideScrollbar:true
    });
  },
  sideToolScroll:function(){
    //监听滚动事件，移动side-tool
    var $post_wrap=$(".main-content");
    var $footer=$(".footer");
    var windowH=$(window).height();
    var $sideTool=$post_wrap.find(".side-tool");
    //静态
    if($post_wrap.height()<=windowH){
      //$sideTool.addClass("static");
      $sideTool.css({
        "bottom":$footer.height()+60+"px"
      })
    }

    //滚动事件
    $(window).on("scroll",function(){
      var distanceTop=$footer.offset().top - $(window).scrollTop()-80;
      if(distanceTop<=windowH){
        $sideTool.addClass("static");
      }else{
        $sideTool.removeClass("static");
      }
    });
    $sideTool.show();
  }
};

$(document).ready(function(){
  
  //图片放大
  PostFunction.wrapImageWithFancyBox();
  PostFunction.sideToolScroll();

  //赞赏按钮
  $(".post_wrap").find(".btn-pay").on("click",function(){
    console.log(CONFIG);
    $.fancybox.open([
      {
        src  : CONFIG.root+'images/pay.png',
        opts : {
          caption : '感谢您的慷慨资助',
          thumb   : CONFIG.root+'/images/pay.png'
        }
      }
    ], {
      loop : true,
      hideScrollbar:false,
      thumbs : {
        autoStart : true
      }      
    });
  })
  //返回顶部
  $(".back-to-top").on("click",function(){
    var top=$(window).scrollTop();
    var tI=setInterval(function(){
      if(top>0){
        top=top-80;
        $(window).scrollTop(top);
      }else{
        clearInterval(tI);
      }
    },50)
  });
  //分享按钮
  $(".side-share").on("mouseenter",function(){
    var $this=$(this);
    $this.find(".iShare-content").show();
  }).on("mouseleave",function(){
    var $this=$(this);
    $this.find(".iShare-content").hide();
    $(".wxbox").hide();
  });
  //图片懒加载
  layui.use(['flow'], function(){
    //图片懒加载
    var flow = layui.flow;
    flow.lazyimg();
  });

  //隐藏文章目录的序号
  var $catalogueContent=$(".catalogue-content");
  $catalogueContent.find(".toc-item").each(function(index,item){
      var $this=$(item);
      $this.find(".toc-number").remove();
  });

  // 获取屏幕大小，修改文章目录的位置
  var screenWidth=window.innerWidth;
  if(screenWidth<992){
    var $parent=$catalogueContent.parent();
    $(".main-inner .layui-row").prepend($parent);
  }
});