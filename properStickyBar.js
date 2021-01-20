function stickySideBar(element, options = {}) {
    var _this = this;

    //declared element
    _this.debouncer;
    _this.element = element;

    if ($(_this.element).length === 0) {
        return;
    }

    // declared options
    _this.parentElementClass = options.parentElementClass;
    _this.wrapClass = options.wrapClass;
    _this.activeStickyClass = options.activeStickyClass;
    _this.top = options.top;
    _this.width = options.width;
    _this.activeBottomClass = options.activeBottomClass;
    _this.disableOnMobile = options.disableOnMobile ? options.disableOnMobile : true;

    _this.breakpoint = 992;

    _this.init = function () {
        if (_this.disableOnMobile === true) {
            _this.breakpoint = _this.breakpoint;
        } else if (typeof _this.disableOnMobile == "number") {
            _this.breakpoint = _this.disableOnMobile;
        } else if (_this.disableOnMobile === false) {
            _this.breakpoint = false;
        }

        if (_this.disableOnMobile && Boolean($(window).width() < _this.breakpoint)) {
            $(window).unbind("scroll");
            $(_this.element)
                .removeClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked", _this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
                .removeAttr("style");
            return;
        } else {
            $(_this.element)
                .removeClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked", _this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
                .removeAttr("style");
        }

        // sticky bar vars
        var stickyBarTop = $(_this.element).offset().top;
        var stickyBarHeight = $(_this.element).height();
        var stickyBarWidth = _this.width ? _this.width : $(_this.element).width();

        // add wrapper class if exists
        $(_this.element).addClass(_this.wrapClass ? _this.wrapClass : "sticked");

        // take offset top = can be data-offset-top or passed trough options
        var stickyBarOffsetTop = $(_this.element).data("offset-top") ? $(_this.element).data("offset-top") : _this.top ? _this.top : 0;

        // options for parent element
        var parentElement = _this.parentElementClass;
        var selectedParentElement;

        // if there is parent element defined use it as barrier else take first parent
        var selectedParentElementBottomPosition;
        if (parentElement) {
            selectedParentElement = $(parentElement);
        } else {
            selectedParentElement = $(_this.element).parent();
        }

        //calculate height of parent + distance from top
        selectedParentElementBottomPosition = selectedParentElement.height() + (window.pageYOffset + selectedParentElement[0].getBoundingClientRect().top) - stickyBarHeight - stickyBarOffsetTop;

         if (selectedParentElement.height() < window.innerHeight) return;

        $(window).scroll(function () {
            var windowScrollTop = $(this).scrollTop();

            // if you have passed top of selected element
            if (windowScrollTop >= stickyBarTop) {
                // if you have passed bottom of parent stick it to the bottom
                if (windowScrollTop >= selectedParentElementBottomPosition) {
                    $(_this.element)
                        .removeClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked")
                        .addClass(_this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
                        .css({ position: "absolute", top: "unset", bottom: "0px", width: stickyBarWidth + "px", height: stickyBarHeight + "px" });
                } else {
                    $(_this.element)
                        .addClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked")
                        .removeClass(_this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
                        .css({ position: "fixed", top: stickyBarOffsetTop + "px", width: stickyBarWidth + "px", height: stickyBarHeight + "px" });
                }
            } else {
                $(_this.element)
                    .removeClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked")
                    .css({ position: "static", top: "0px", width: stickyBarWidth + "px", height: stickyBarHeight + "px" });
            }
        });

        // init => start position if you are already scrolled
        $(document).ready(function () {
            var windowScrollTop = $(this).scrollTop();

            if (windowScrollTop >= stickyBarTop) {
                $(element)
                    .addClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked")
                    .removeClass(_this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
                    .css({ position: "fixed", top: stickyBarOffsetTop + "px", width: stickyBarWidth + "px", height: stickyBarHeight + "px" });
                return;
            }

            if (windowScrollTop >= selectedParentElementBottomPosition) {
                $(element)
                    .removeClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked")
                    .addClass(_this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
                    .css({ position: "absolute", top: "unset", bottom: "0px", width: stickyBarWidth + "px", height: stickyBarHeight + "px" });

                return;
            }
        });
    };

    _this.updateSticky = function (timeout) {
        var timeoutVal = timeout ? timeout : 100;

        clearTimeout(_this.debouncer);
        _this.debouncer = setTimeout(function () {
            _this.init();
        }, timeoutVal);
    };

    _this.destroy = function () {
        $(window).unbind("scroll");
        $(_this.element)
            .removeClass(_this.activeStickyClass ? _this.activeStickyClass : "is-sticked", _this.activeBottomClass ? _this.activeBottomClass : "is-bottom")
            .removeAttr("style");
        return;
    };

    return _this.init();
}
