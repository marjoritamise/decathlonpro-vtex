APP.component.DropFilter = ClassAvanti.extend({
    init: function (settings) {
        const self = this;

        self.setup(settings);
        self.start();
        self.bind();
    },

    setup: function (settings) {
        const self = this;

        self.settings = $.extend({
            $buttonLink: $('.listagem-filter__button'),
            $content: $('.result-filter__menu')
        }, settings);
    },

    start: function () {
        const self = this;
    },

    bind: function () {
        const self = this;

        self.bindClick();
    },

    bindClick: function () {
        if ($(window).width() < 992) {
            this.settings.$buttonLink.on('click', e => {
                e.preventDefault();

                const _this = $(e.currentTarget);

                const $next = _this.next(this.settings.$content);
                const $nextFixed = $('.filter-mobile');
                const $classDrop = 'listagem-filter--open';
                const $classFixed = 'result-filter--fixed';

                if ($next.hasClass($classDrop)) {
                    $next.removeClass($classDrop);
                    $nextFixed.removeClass($classFixed);
                    $(".overlay-filter").removeClass("overlay-filter--active");
                } else {
                    $next.addClass($classDrop);
                    $nextFixed.addClass($classFixed);
                    $(".overlay-filter").addClass("overlay-filter--active");
                }

            });
        }
    }
});
