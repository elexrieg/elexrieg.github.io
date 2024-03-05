$(document).ready(function() {
    var $toc = $(".toc");
    var $content = $(".content");

    if ($(window).width() <= 576) {
        $toc.prependTo($content);
    }
});