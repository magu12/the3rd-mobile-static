export let heroJs = jQuery(document).ready(function ($) {
    $('.next-slide').on('click', function () {
        let slide = $(this).closest('.hero__slide');
        $(slide).index() != +$('.hero__slide').length - 1 ?
            $(slide).removeClass('active').addClass('hide').next().addClass('active') :
            $(slide).removeClass('active').siblings().removeClass('hide').eq(0).addClass('active')
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
        if (direction && $('.hero').hasClass('active'))
            if (direction == 'right') $('.hero__slide.active .next-slide').click();
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