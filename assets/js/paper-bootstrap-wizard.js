searchVisible = 0;
transparent = true;
        $(document).ready(function(){
            /*  Activate the tooltips      */
            $('[rel="tooltip"]').tooltip();
            localStorage.setItem('headcolor','Beige')
            localStorage.setItem('legcolor','Kirschholz')
            // Code for the Validator
            var $validator = $('.wizard-card form').validate({
        		  rules: {
        		    firstname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    lastname: {
        		      required: true,
        		      minlength: 3
        		    },
        		    email: {
        		      required: true
        		    }
                },
        	});

            // Wizard Initialization
          	$('.wizard-card').bootstrapWizard({
                'tabClass': 'nav nav-pills',
                'nextSelector': '.btn-next',
                'previousSelector': '.btn-previous',

                onNext: function(tab, navigation, index) {
                	var $valid = $('.wizard-card form').valid();
                	if(!$valid) {
                		$validator.focusInvalid();
                		return false;
                	}
                },

                onInit : function(tab, navigation, index){

                  //check number of tabs and fill the entire row
                  var $total = navigation.find('li').length;
                  $width = 100/$total;

                  navigation.find('li').css('width',$width + '%');

                },

                onTabClick : function(tab, navigation, index){

                    var $valid = $('.wizard-card form').valid();

                    if(!$valid){
                        return false;
                    } else{
                        return true;
                    }

                },
                onTabClick: function(tab, navigation, index) {
                    return false;
                },

                onTabShow: function(tab, navigation, index) {
                    var $total = navigation.find('li').length;
                    var $current = index+1;
                    var $wizard = navigation.closest('.wizard-card');
                    if($current >= $total) {
                        $($wizard).find('.btn-next').hide();
                        $($wizard).find('.btn-finish').show();
                    } else {
                        $($wizard).find('.btn-next').show();
                        $($wizard).find('.btn-finish').hide();
                    }
                    var move_distance = 100 / $total;
                    move_distance = move_distance * (index) + move_distance / 2;
                    $wizard.find($('.progress-bar')).css({width: move_distance + '%'});
                    $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');

                }
	        });

                $('.leg[data-toggle="wizard-radio"]').click(function(){
                    var appendDiv = '<div class="choice choix" data-toggle="wizard-radio"><input type="radio" name="lampes" value="'+localStorage.getItem('lampes')+'"><div class="card card-checkboxes card-hover-effect"><img src="assets/img/examples/'+localStorage.getItem('lampes')+'-'+localStorage.getItem('headcolor')+'-'+$(this).find('[type="radio"]')[0].value+'.png" width="110" height="270"><p>'+localStorage.getItem('lampes')+'</p></div></div>'
                    $('#mychoice').empty();
                    $('#mychoice').html(appendDiv);
                    wizard = $(this).closest('.wizard-card');
                    wizard.find('.leg[data-toggle="wizard-radio"]').removeClass('active');
                    $(this).addClass('active');
                    $(wizard).find('[type="radio"]').removeAttr('checked');
                    $(this).find('[type="radio"]').attr('checked','true');
                    console.log($(this).find('[type="radio"]')[0].value)
                    localStorage.setItem($(this).find('[type="radio"]')[0].name, $(this).find('[type="radio"]')[0].value);
                    if (localStorage.getItem('lampes') && localStorage.getItem('legcolor') && localStorage.getItem('headcolor')) {
                    $('.btn-next').removeAttr('disabled')
                    }
                });
                $('.head[data-toggle="wizard-radio"]').click(function(){
                    var appendDiv = '<div class="choice choix" data-toggle="wizard-radio"><input type="radio" name="lampes" value="'+localStorage.getItem('lampes')+'"><div class="card card-checkboxes card-hover-effect"><img src="assets/img/examples/'+localStorage.getItem('lampes')+'-'+$(this).find('[type="radio"]')[0].value+'-'+localStorage.getItem('legcolor')+'.png" width="110" height="270"><p>'+localStorage.getItem('lampes')+'</p></div></div>'
                    $('#mychoice').empty();
                    $('#mychoice').html(appendDiv);
                    wizard = $(this).closest('.wizard-card');
                    wizard.find('.head[data-toggle="wizard-radio"]').removeClass('active');
                    $(this).addClass('active');
                    $(wizard).find('[type="radio"]').removeAttr('checked');
                    $(this).find('[type="radio"]').attr('checked','true');
                    localStorage.setItem($(this).find('[type="radio"]')[0].name, $(this).find('[type="radio"]')[0].value);
                    if (localStorage.getItem('lampes') && localStorage.getItem('legcolor') && localStorage.getItem('headcolor')) {
                    $('.btn-next').removeAttr('disabled')
                    }
                });
                $('.choix[data-toggle="wizard-radio"]').click(function(){
                    wizard = $(this).closest('.wizard-card');
                    wizard.find('.choix[data-toggle="wizard-radio"]').removeClass('active');
                    $(this).addClass('active');
                    $(wizard).find('[type="radio"]').removeAttr('checked');
                    $(this).find('[type="radio"]').attr('checked','true');
                    localStorage.setItem($(this).find('[type="radio"]')[0].name, $(this).find('[type="radio"]')[0].value);
                });
                $('.set-full-height').css('height', 'auto');

                $( "#name" ).keyup(function() {
                    if ($('#name').val().length > 3  && $('#email').val().length > 3 && $('#email').valid()) {
                    $('.finish').removeAttr('disabled','disabled')
                    } else {
                        $('.finish').attr('disabled','disabled')
                    };
                });
                $( "#email" ).keyup(function() {
                    if ($('#name').val().length > 3  && $('#email').val().length > 3 && $('#email').valid()) {
                    $('.finish').removeAttr('disabled','disabled')
                    } else {
                        $('.finish').attr('disabled','disabled')
                    };
                });
                    $('.finish').click(function () {
                let lampes =localStorage.getItem('lampes')
                let legcolor =localStorage.getItem('legcolor')
                let headcolor =localStorage.getItem('headcolor')
                let name = $('#name').val()
                let description = $('#description').val()
                let email = $('#email').val()
                let msg = 'Name : '+name+' Description : '+description+' Lampe : '+lampes+ ' legcolor : '+legcolor+' headcolor : '+headcolor+' newsletter : '+$('#newsletter').prop( "checked" );
                $.post('https://mailthis.to/yessin_gandouz@yahoo.de', {
                    email: email,
                    _subject: 'AtmoLight!',
                    message: msg
                }).then(function (e) {
                    localStorage.clear();
                   location.href = 'https://mailthis.to/confirm'
                });
            })
                $('.btn-next').click(function(){
                    $('.btn-next').attr('disabled','disabled')
                    $('#lmp').html(localStorage.getItem('lampes'))
                    $('#hf').html(localStorage.getItem('legcolor'))
                    $('#lf').html(localStorage.getItem('headcolor'))
                    $('#finalProduct').empty();
                    $('#mychoice > div').clone().appendTo('#finalProduct');
                });
                $('.choix').click(function(){
                    $('#mychoice').empty();
                    $(this).clone().appendTo('#mychoice');
                    $('.btn-next').removeAttr('disabled')
                });
            });
