$(document).ready(function(){
  var animejs={
    init:function(){
      // 设置瀑布流
      var grid = document.querySelector('.grid');
      var msnry = new Masonry( grid, {
        itemSelector: '.grid-item',
        gutter: 20,
        fitWidth: true
      });
      var $gridItem=$(".grid-item");
      //模块化加载layUi
      layui.use(['rate','layer','carousel','flow'], function(){
        var rate = layui.rate;
        //生成评分
        var rateArray=$(".cover-bottom .rate");
        $(rateArray).each(function(index,item){
          var mark=item.getAttribute("data-mark");
          //渲染
          var ins1 = rate.render({
            elem: '#'+item.id  //绑定元素
            ,value:mark/2
            ,readonly:true
            ,half:true
          });
        });

        //生成详情页面的弹出层
        var layer = layui.layer;
        $gridItem.find(".detail_btn").on("click",function(){
          var $this=$(this);
          var detail_i=$this.attr("data-index");
          layer.open({
            type: 1,
            title:"观后感",
            area:"80%",
            content: $(".detail-wrap."+detail_i) //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            ,success:function(layero, index){
              //图片懒加载
              if(!layero[0]){
                return;
              }
              var imgArray=layero[0].querySelectorAll("img");
              imgArray.forEach(element => {
                var src=element.getAttribute("lay-src");
                if(src){
                  element.src=element.getAttribute("lay-src");
                }
              });
            }
          });
        });

        //图片的轮播图
        var carousel = layui.carousel;
        $(".layui-carousel").each(function(index,item){
          //建造实例
          carousel.render({
            elem: '#'+item.id
            ,width: '100%' //设置容器宽度
            ,arrow: 'always' //始终显示箭头
            //,anim: 'updown' //切换动画方式
          });
        });

        //图片懒加载
        var flow = layui.flow;
        flow.lazyimg();
        
      });
      //滑动cover时显示标题
      $(".cover").on("mouseenter",function(){
        var $this=$(this);
        var $title=$this.find(".title");
        $title.show();
      }).on("mouseleave",function(){
        var $this=$(this);
        var $title=$this.find(".title");
        $title.hide();
      });
      //轮播图插件
      $('.detail-wrap .pic-wrap img')
      .not('[hidden]')
      .each(function() {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.length < 1) {
          var imageLink = $image.attr('lay-src') ? this.getAttribute('lay-src') : this.getAttribute('src');
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

    }
  };
  // 执行初始化
  animejs.init();
});