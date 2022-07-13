export let serviceJs = jQuery(document).ready(function ($) {

    const handleSwipe = (section, direction) => {
        if (section == 'consulting' && direction == 'right') {
            if (!$('.consulting__open').hasClass('hide')) {
                $('.consulting__open').addClass('hide');
                $('.consulting__item').eq(0).addClass('active')
            } else {
                if ($('.consulting__item.active').index() != +$('.consulting__item').length - 1)
                    $('.consulting__item.active').removeClass('active').addClass('hide').next().addClass('active');
                else {
                    $('.consulting__item').removeClass('active hide');
                    $('.consulting__open').removeClass('hide');
                }
            }
        }
        if (section == 'consulting' && direction == 'left') {
            if ($('.consulting__open').hasClass('hide') && $('.consulting__item').eq(0).hasClass('active')) {
                $('.consulting__open').removeClass('hide')
            } else {
                $('.consulting__item.active').removeClass('active').prev().removeClass('hide').addClass('active');
            }
        }


        if (section == 'digital' && direction == 'right') {
            if (!$('.digital__open').hasClass('hide')) {
                $('.digital__open').addClass('hide');
                $('.digital__item').eq(0).addClass('active')
            } else {
                if ($('.digital__item.active').index() != +$('.digital__item').length - 1)
                    $('.digital__item.active').removeClass('active').addClass('hide').next().addClass('active');
                else {
                    $('.digital__item').removeClass('active hide');
                    $('.digital__open').removeClass('hide');
                }
            }
        }
        if (section == 'digital' && direction == 'left') {
            if ($('.digital__open').hasClass('hide') && $('.digital__item').eq(0).hasClass('active')) {
                $('.digital__open').removeClass('hide')
            } else {
                $('.digital__item.active').removeClass('active').prev().removeClass('hide').addClass('active');
            }
        }
    }

    $('.consulting__tab').on('click', function () {
        $('.consulting__open').addClass('hide');
        $('.consulting__item').removeClass('active hide').eq($(this).index()).addClass('active');
        $.makeArray($('.consulting__item')).map((item) => {
            if ($(item).index() < $('.consulting__item.active').index())
                $(item).addClass('hide');
        });
    });

    $('.digital__tab').on('click', function () {
        $('.digital__open').addClass('hide');
        $('.digital__item').removeClass('active hide').eq($(this).index() + 1).addClass('active');
        $.makeArray($('.digital__item')).map((item) => {
            if ($(item).index() < $('.digital__item.active').index())
                $(item).addClass('hide');
        });
    });


    var startPositionX, startPositionY, endPositionX, endPositionY;
    jQuery(window).on("touchstart", function (e) {
        startPositionX = e.touches[0].clientX;
        startPositionY = e.touches[0].clientY;
    })


    jQuery(window).on("touchend", function (e) {
        endPositionX = e.changedTouches[0].clientX;
        endPositionY = e.changedTouches[0].clientY;
        let direction = touchDirection();
        if (direction) {
            if ($('.consulting').hasClass('active'))
                handleSwipe('consulting', direction);
            if ($('.digital').hasClass('active'))
                handleSwipe('digital', direction);
        }
    })


    const touchDirection = () => {
        let xDirection;
        let yDirection;
        if (startPositionX < endPositionX) {
            xDirection = 'left';
        } else {
            xDirection = 'right';
        }
        if (startPositionY < endPositionY) {
            yDirection = 'top';
        } else {
            yDirection = 'bot';
        }

        let horizontalDistance = Math.abs(startPositionX - endPositionX);
        let verticalDistance = Math.abs(startPositionY - endPositionY);
        let validDistans = true;
        if (horizontalDistance > verticalDistance) {
            if (horizontalDistance < 30) {
                validDistans = false;
                return validDistans
            }
            return xDirection;
        } else {
            if (verticalDistance < 30) {
                validDistans = false;
                return validDistans;
            }
            return yDirection;
        }
    }
});