(function ($) {

    //============wow init===========================================
    new WOW().init();
    //============wow init===========================================


//==================================slider =================================


    $.fn.slider = function (options) {
        var sliderContent = $('.slider-content');
        var sliderData = $('.slider-data');
        var countSlide = $('.slider-data > div').length;
        var counter = 1;
        var sliders = []; // здесь будут хранится блоки с контентом

        var sliderDots = $('.slider-dots');
        var targetI = '';
        var sliderWrap = $('.slider-wrapper');

        var optionsSlider = {
            from: 'fa-circle-o',
            to: 'fa-circle-o',
            animation: 'tada'
        };

        var timerId = setInterval(function () {
            $('#num-' + counter).trigger('click')
        }, 7000);

        // Создаете настройки по умолчанию, которые расширяют ваши опции
        //var settings = $.extend( {
        //    'location'         : 'top',
        //    'background-color' : 'blue'
        //}, options);
        //
        var init = (function () {

            var changeContent = function () {

                sliderContent.html(sliders[counter]);
                if (counter >= countSlide) {
                    counter = 1;
                } else {
                    counter++;
                }
            };


            for (var i = 1; i <= countSlide; i++) {
                sliders[i] = sliderData.find('.slider' + i);
                sliderDots.append('<i class="fa fa-circle-o" id=num-' + i + '></i>')
            }

            sliderWrap.css('background-image', 'url("img/slider/' + counter + '.jpg")');
            sliderContent.html(sliders[counter]);
            counter++;

            sliderDots.find('i').first().addClass('active');

            sliderDots.on('click', function (e) {

                targetI = e.target.id.slice(4);

                clearTimeout(timerId);

                if (targetI !== '') {

                    var dotSlider = document.getElementById('num-' + targetI);
                    iconate(dotSlider, optionsSlider);

                    sliderDots.find('i').filter('.active').removeClass('active');
                    $('#num-' + targetI).addClass('active');

                    sliderContent.animate({right: '60%'}, 1000, 'easeInOutBack', function () {

                        changeContent(targetI);
                        sliderWrap.css('background-image', 'url("img/slider/' + targetI + '.jpg")');

                        $(this).removeClass('bounceInLeft').removeClass('animated')
                            .animate({right: 0}, 1000, 'easeInOutBack').stop(false, true);
                    });

                    timerId = setInterval(function () {
                        $('#num-' + counter).trigger('click')
                    }, 7000);
                }
            });

        })(counter);


        return {
            init: init
        };

    }();


})(jQuery);

