APP.component.DropContent = ClassAvanti.extend({
    init: function () {
        this.setup();
        this.start();
        this.bind();
    },

    setup: function () {
        this.body = $('body');
        this.scope = $('.drop-container');
    },

    start: function () {
        this.resize();
    },

    resize: function () {
        var pageHeight = APP.i.util.screenH();

        this.scope.each(function () {
            var content = $(this).find('.drop-container__content'),
                fixedTop = content.find('.drop-container__content__fixed-top'),
                fixedTopHeight = fixedTop.outerHeight(),
                fixedBottom = content.find('.drop-container__content__fixed-bottom'),
                fixedBottomHeight = fixedBottom.outerHeight(),
                scroll = content.find('.drop-container__content__scroll');

            if (fixedTopHeight == null) { fixedTopHeight = 0; }
            if (fixedBottomHeight == null) { fixedBottomHeight = 0; }

            content.css('height', pageHeight + 'px')
            scroll.css({
                'height': (pageHeight - (fixedTopHeight + fixedBottomHeight)) + 'px',
                'top': fixedTopHeight + 'px'
            })
        })
    },

    openDrop: function (target) {
        target.stop(true,true).fadeIn().addClass('open');
        this.body.addClass('scroll-lock');
    },

    closeDrop: function () {
        this.scope.removeClass('open').stop(true,true).fadeOut();
        this.body.removeClass('scroll-lock');
    },

    bind: function () {
        var _this = this;

        $(window).on({
            resize: function () {
                _this.resize();
            }
        })

        $('body').on('click', '.drop-open-btn', function (e) {
            e.preventDefault()
            var target = $('.' + $(this).data('target'));
            _this.openDrop(target);
            _this.resize();
        })

        $('body').on('click', '.drop-container__content', function (e) {
            if ($('.header__close-mobile').has(e.target).length === 1 || $('.drop-close').has(e.target).length === 1) {
                _this.closeDrop();
            } else if ($('.drop-container__content').is(e.target) && $('.drop-container__content').has(e.target).length === 0) {
                _this.closeDrop();
            }
        })

        $('body').on('click', '.drop-close', function (e) {
            e.preventDefault()
            _this.closeDrop();
        })
    }
})