var items = [];
var modules = [];
$(document).ready(function() {
    $.getJSON('modules.json', (data) => {
        modules = data.modules;
        modules.forEach((val) => {
            items.push("<div class='row justify-content-between p-3'><div class='col-7 align-middle'><span><h5 class='mt-2'>"+val.id+"</h5><p>"+val.name+"</p></span></div><div class='col-3 text-center align-middle'><i class='fa-solid fa-arrow-right mt-4 module-details-link'id="+val.id+"></i></div></div>");
        })
    })
    .done(() => {
        $(items.join("")).appendTo("#modules-section-2")
    });

    $(document).on('click','.module-details-link', function(event){
        $.ajax({
            url: 'moduledetail.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        })
        .done(() => {
            $.getJSON('modules.json', (data) => {
                modules = data.modules;
            })
            .done(() => {
                modules.forEach((val) => {
                    if(val.id == event.target.id){
                        $('#module-detail-code').text(val.id);
                        $('#module-detail-name').html(val.name);
                        $('#module-detail-description').text(val.description);
                        $(val.lecturers).each((key, value) => {
                            $('#module-detail-lecturers').append("<p>"+value+"</p>");
                        })
                        $('#module-detail-date').text(val.schedule.date);
                        $('#module-detail-time').text(val.schedule.time);
                        $('#module-detail-location').text(val.schedule.location);
                    }
                })
            })
        })

    });

    $('#module-edit-button').click(() => {
        var id = $('#module-detail-code').text();
        var name = $('#module-detail-name').html();
        var description = $('#module-detail-description').html();
        var date = $('#module-detail-date').html();
        var time = $('#module-detail-time').html();
        var location = $('#module-detail-location').html();
        var lecturers = [];
        $("#module-detail-lecturers p").map((key, element) => {
            lecturers.push($(element).text());
        })
        console.log(lecturers)
        $.ajax({
            url: 'moduleedit.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        })
        .done(() => {
            $('#module-edit-code').val(id);
            $('#module-edit-name').val(name);
            $('#module-edit-description').val(description);
            $('#module-edit-date').val(date);
            $('#module-edit-time').val(time);
            $('#module-edit-lecturers').val(lecturers.join("\n"))
            $('#module-edit-location').val(location);
        })
    });
});


