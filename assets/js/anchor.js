$(document).ready(function() {
    $('h1, h2, h3, h4, h5, h6').each(function() {
        var id = $(this).attr('id');
        if (id) {
            var anchor = $('<a/>').addClass('anchor').attr('href', ' #' + id).text('#');
            $(this).append(anchor);
        }
    });
});
