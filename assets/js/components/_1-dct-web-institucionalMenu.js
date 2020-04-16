APP.component.DropMenu = ClassAvanti.extend({
    init: function (settings) {
        const self = this;

        self.setup(settings);
        self.start();
        self.bind();
    },

    setup: function (settings) {
        const self = this;

        self.settings = $.extend({
            $buttonLink: $('.institucional-subjetct__button'),
            $content: $('.institucional-subjetct__menu')
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
        this.settings.$buttonLink.on('click', e => {
            e.preventDefault();

            const _this = $(e.currentTarget);

            const $next = _this.next(this.settings.$content);
            const $nextFixed = $('.institucional-subjetct');
            const $classDrop = 'institucional-subjetct__menu--open';
            const $classFixed = 'institucional-subjetct--fixed';

            if ($next.hasClass($classDrop)) {
              $next.removeClass($classDrop);
              $nextFixed.removeClass($classFixed);
            } else {
              $next.addClass($classDrop);
              $nextFixed.addClass($classFixed);
            }
        });
    }
});
