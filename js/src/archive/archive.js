$(document).ready(function(){
    $(".archive_left .archive_item").on("click",function(){
        var $this=$(this);
        var year=$this.data("year");
        $this.addClass("active").siblings().removeClass("active");
        var $right=$(".archive_right");
        $right.find("."+year).show().siblings().hide();
    })
});