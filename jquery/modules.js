var modules = [
        {
            "id": "TU248",
            "name": "Applied Statistics",
            "description": "The programme Postgraduate Certificate in Applied Statistics is a one-year part-time course, delivered by the School of Mathematical Sciences. Classes are held in the evenings so that study can be balanced with work and personal life. This course studies a range of modern topics in statistics at Postgraduate Certificate level. The course is suitable for participants who wish to learn statistics for the first time or to build on their existing knowledge and skills set.",
            "lecturers": ["Fiona Murray", "asxdasdx asds"],
            "schedule": {
                "date": "2018-09-21",
                "time": "06:30",
                "location": "Online"
            }
        },
        {
            "id": "TU304",
            "name": "Accounting",
            "description": "The programme Postgraduate Certificate in Applied Statistics is a one-year part-time course, delivered by the School of Mathematical Sciences. Classes are held in the evenings so that study can be balanced with work and personal life. This course studies a range of modern topics in statistics at Postgraduate Certificate level. The course is suitable for participants who wish to learn statistics for the first time or to build on their existing knowledge and skills set.",
            "lecturers": ["Fiona Murray"],
            "schedule": {
                "date": "September 2023",
                "time": "06:30 PM",
                "location": "Online"
            }
        },
        {
            "id": "TU237",
            "name": "Gastronomy & Food Studies",
            "description": "The programme Postgraduate Certificate in Applied Statistics is a one-year part-time course, delivered by the School of Mathematical Sciences. Classes are held in the evenings so that study can be balanced with work and personal life. This course studies a range of modern topics in statistics at Postgraduate Certificate level. The course is suitable for participants who wish to learn statistics for the first time or to build on their existing knowledge and skills set.",
            "lecturers": ["Fiona Murray"],
            "schedule": {
                "date": "September 2023",
                "time": "06:30 PM",
                "location": "Online"
            }
        }
];


$(document).ready(function() {
    $.ajax({
        url: 'homepage.html',
        success: function(data) {
          $('.index-page').html(data);
        }
    })

    $('#modules-page').click((event) => {
        event.preventDefault();
        $.ajax({
            url: 'modules.html',
            success: function(data) {
              $('.index-page').html(data);
            }
        }).done(() => {
            var items = [];
            modules.forEach((val) => {
                var val3 = JSON.stringify(val);
                items.push("<div class='row justify-content-between p-3'><div class='col-7 align-middle'><span><h5 class='mt-2'>"+val.id+"</h5><p>"+val.name+"</p></span></div><div class='col-3 text-center align-middle'><i class='fa-solid fa-arrow-right mt-4 module-details-link'id="+val.id+"></i></div></div>");
            });
            $(items.join("")).appendTo("#modules-section-2");       
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").removeClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").addClass("active");
        })
    })
    
    $(document).on('click','.module-details-link', function(event){
        $.ajax({
            url: 'moduledetail.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        })
        .done(() => {
            $('.navbar-collapse').removeClass('show'); 
            modules.forEach((val, key) => {
                if(val.id == event.target.id){
                    $('#module-detail-code').text(val.id);
                    $('#module-detail-index').val(key);
                    $('#module-detail-name').html(val.name);
                    $('#module-detail-description').text(val.description);
                    $(val.lecturers).each((key, value) => {
                        $('#module-detail-lecturers').append("<p>"+value+"</p>");
                    })
                    $('#module-detail-date').text("Commencement Date: "+val.schedule.date);
                    $('#module-detail-time').text("Time: "+val.schedule.time);
                    $('#module-detail-location').text("Location: "+val.schedule.location);
                }
            });
        });

    });

    $(document).on('click','#module-edit-button', function(event){
        event.preventDefault();
        var id = $('#module-detail-code').text();
        var name = $('#module-detail-name').html();
        var description = $('#module-detail-description').html();
        var date = $('#module-detail-date').html().split(": ")[1];
        var time = $('#module-detail-time').html().split(": ")[1];
        var location = $('#module-detail-location').html().split(": ")[1];
        var lecturers = [];
        var index  = $('#module-detail-index').val();
        $("#module-detail-lecturers p").map((key, element) => {
            lecturers.push($(element).text());
        })
        $.ajax({
            url: 'moduleedit.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        })
        .done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            $('#module-edit-index').val(index);
            $('#module-edit-code').val(id);
            $('#module-edit-name').val(name);
            $('#module-edit-description').val(description);
            $('#module-edit-date').val(date);
            $('#module-edit-time').val(time);
            $('#module-edit-lecturers').val(lecturers.join("\n"))
            $('#module-edit-location').val(location);
        })
    });

    $(document).on('click','#module-delete-button', function(event){
        event.preventDefault();
        var index  = $('#module-detail-index').val();
        modules.splice(index, 1);
        $.ajax({
            url: 'modules.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            var items = [];
            modules.forEach((val) => {
                var val3 = JSON.stringify(val);
                items.push("<div class='row justify-content-between p-3'><div class='col-7 align-middle'><span><h5 class='mt-2'>"+val.id+"</h5><p>"+val.name+"</p></span></div><div class='col-3 text-center align-middle'><i class='fa-solid fa-arrow-right mt-4 module-details-link'id="+val.id+"></i></div></div>");
            });
            $(items.join("")).appendTo("#modules-section-2");
            $('.navbar-collapse').removeClass('show'); 
            $('body').removeClass("modal-open");
            $('div').removeClass('modal-backdrop');
            $('div').removeClass('fade');
            $('div').removeClass('show');
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").removeClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").addClass("active");
        });
    })

    $(document).on('click','#module-save-button', function(event){
        event.preventDefault();
        var id = $('#module-edit-code').val();
        var name = $('#module-edit-name').val();
        var description = $('#module-edit-description').val();
        var date = $('#module-edit-date').val();
        var time = $('#module-edit-time').val();
        var location = $('#module-edit-location').val();
        var lecturers = $('#module-edit-lecturers').val().split("\n");
        var index = $('#module-edit-index').val();
        if(id != null && name != null && description != null && date != null && time != null && location !=null && lecturers != null && id != "" && name != ""  && description != "" && date != "" && time != "" && location != "" && lecturers != ""){
            modules[index].id = id;
            modules[index].name = name;
            modules[index].description = description;
            modules[index].schedule.date = date;
            modules[index].schedule.time = time;
            modules[index].schedule.location = location;
            modules[index].lecturers = [];
            lecturers.map((lecturer) => {
                modules[index].lecturers.push(lecturer);
            })
        }
    });


    $(document).on('click','#module-add', function(event){
        event.preventDefault();
        $.ajax({
            url: 'moduleadd.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").removeClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").addClass("active");
        })
    });

    $(document).on('click','#module-delete', function(event){
        event.preventDefault();
        $.ajax({
            url: 'moduledelete.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            var items = [];
            modules.map((val, key) => {
                items.push("<div class='row justify-content-around p-3 flex-row-reverse'><div class='col-8 align-middle'><span><h5 class='mt-2'>"+val.id+"</h5><p>"+val.name+"</p></span></div><div class='col-2 text-center align-middle'><input type='checkbox' name='"+key+"' id='checkbox-delete-"+key+"' class='form-control' value=''></div></div>");
            })
            $(items.join("")).appendTo(".modules-section-2");
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").removeClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").addClass("active");
        })
    });

    $(document).on('click','#module-home', function(event){
        event.preventDefault();
        $.ajax({
            url: 'homepage.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").addClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").removeClass("active");
        })
    });

    $(document).on('click','#module-view', function(event){
        event.preventDefault();
        $.ajax({
            url: 'modules.html',
            success: function(data) {
              $('.index-page').html(data);
            }
        }).done(() => {
            $(window).scrollTop(0);
            var items = [];
            modules.forEach((val) => {
                items.push("<div class='row justify-content-between p-3'><div class='col-7 align-middle'><span><h5 class='mt-2'>"+val.id+"</h5><p>"+val.name+"</p></span></div><div class='col-3 text-center align-middle'><i class='fa-solid fa-arrow-right mt-4 module-details-link'id="+val.id+"></i></div></div>");
            })
            $(items.join("")).appendTo("#modules-section-2");       
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").removeClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").addClass("active");
        });
    });

    $(document).on('click','#module-detail', function(event){
        event.preventDefault();
        var index = $('#module-edit-index').val();
        $.ajax({
            url: 'moduledetail.html',
            success: function(data) {
              $('.index-page').html(data);
            }
        }).done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            modules.forEach((val, key) => {
                if(key == index){
                    $('#module-detail-code').text(val.id);
                    $('#module-detail-index').val(key);
                    $('#module-detail-name').html(val.name);
                    $('#module-detail-description').text(val.description);
                    $(val.lecturers).each((key, value) => {
                        $('#module-detail-lecturers').append("<p>"+value+"</p>");
                    })
                    $('#module-detail-date').text("Commencement Date: "+val.schedule.date);
                    $('#module-detail-time').text("Time: "+val.schedule.time);
                    $('#module-detail-location').text("Location: "+val.schedule.location);
                }
            });   
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").removeClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").addClass("active");
        });
    });

    $(document).on('click','#module-add-save', function(event){
        event.preventDefault();
        var id = $('#module-add-code').val();
        var name = $('#module-add-name').val();
        var description = $('#module-add-description').val();
        var date = $('#module-add-date').val();
        var time = $('#module-add-time').val();
        var location = $('#module-add-location').val();
        var lecturers = $('#module-add-lecturers').val().split("\n");
        if(id != null && name != null && description != null && date != null && time != null && location !=null && lecturers != null && id != "" && name != ""  && description != "" && date != "" && time != "" && location != "" && lecturers != ""){
            modules.push({
                id: id,
                name: name,
                description: description,
                lecturers: lecturers,
                schedule: {
                    date: date,
                    time: time,
                    location: location
                }
            });
        }
    });

    $(document).on('click','#module-add-next', function(event){
        $.ajax({
            url: 'homepage.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            $('body').removeClass("modal-open");
            $('div').removeClass('modal-backdrop');
            $('div').removeClass('fade');
            $('div').removeClass('show');
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").addClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").removeClass("active");
        });
    });

    $(document).on('click','#module-edit-next', function(event){
        $.ajax({
            url: 'homepage.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            $('body').removeClass("modal-open");
            $('div').removeClass('modal-backdrop');
            $('div').removeClass('fade');
            $('div').removeClass('show');
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").addClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").removeClass("active");
        });
    });

    $(document).on('click','#module-delete-btn', function(event){
        event.preventDefault();
        modules.map((val, key) => {
            if($('#checkbox-delete-'+key).is(":checked")){
                modules.splice(key, 1);
            }
        });
        $.ajax({
            url: 'homepage.html',
            success: function(data) {
              $('.index-page').html(data);
            }   
        }).done(() => {
            $(window).scrollTop(0);
            $('.navbar-collapse').removeClass('show'); 
            $('body').removeClass("modal-open");
            $('div').removeClass('modal-backdrop');
            $('div').removeClass('fade');
            $('div').removeClass('show');
            $('.navbar-collapse').removeClass('show'); 
            $('#bottom-nav span:nth-child(1)').children("a").addClass("active");
            $('#bottom-nav span:nth-child(4)').children("a").removeClass("active");
        });

    });

});


