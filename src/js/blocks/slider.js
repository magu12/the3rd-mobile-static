export let sliderJs = jQuery(document).ready(function ($) {
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
            if (direction == 'bot')
                handleSection($('.section').eq($('.section.active').index() + 1));
            else if (direction == 'top' && $('.section.active').index() != 0)
                handleSection($('.section').eq($('.section.active').index() - 1));
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

    const handleSection = (section) => {
        $(section).addClass('active').removeClass('next prev').siblings().removeClass('active next prev').eq($(section).index()).addClass('next');
        $(section).siblings().eq($(section).index() - 1).addClass('prev');
        $('body').removeClass().addClass($(section).attr('bg-color'));
    }
});