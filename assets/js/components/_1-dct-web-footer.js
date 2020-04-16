APP.component.Footer = ClassAvanti.extend({
  init: function () {
    this.setup();
    this.start();
    this.bind();
  },

  setup: function () {
  },

  start: function () {
  },

  bind: function () {
    this.bindOpenLinks();
  },

  bindOpenLinks: function () {
    $('.footer-content__title').on('click', e => {
      e.preventDefault();

      const _this = $(e.currentTarget);

      const $next = _this.next('.footer-content__list');
      const classOpen = 'footer-content__list--open';

      if ($next.hasClass(classOpen)) {
        $next.removeClass(classOpen);
      } else {
        $next.addClass(classOpen);
      }
    });
  }
});
