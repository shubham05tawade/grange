$(document).ready(function() {
    $.ajax({
        url: 'homepage.html',
        success: function(data) {
          $('.index-page').html(data);
        }
    });

    $('#modules-page').click((event) => {
        event.preventDefault();
        $.ajax({
            url: 'modules.html',
            success: function(data) {
              $('.index-page').html(data);
            }
        });
    })
});