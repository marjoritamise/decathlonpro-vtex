APP.component.AvantiModal = ClassAvanti.extend({
  init: function (settings) {
    this.setup();
    this.bind();
  },

  init: function (settings) {
    this.setup();
    this.bind();
  },

  setup: function () {
    this.body = $('body');
  },

  open: function (target) {
    target.fadeIn()
    this.body.addClass('scroll-lock');
  },

  close: function (target) {
    $('.av-modal').fadeOut()
    this.body.removeClass('scroll-lock');
  },

  resize: function (target) {
    /*var pageHeight = APP.i.util.screenH();

    this.scope.each(function () {
        var content = $('.av-modal ')

        content.css('height', pageHeight + 'px')
        scroll.css({
            'height': (pageHeight - (fixedTopHeight + fixedBottomHeight)) + 'px',
            'top': fixedTopHeight + 'px'
        })
    })*/
  },

  bind: function () {
    var _this = this;

    $('body').on('click', '.av-modal-open', function (e) {
      e.preventDefault();
      _this.open($('.' + $(this).data('target')));
      _this.resize($('.' + $(this).data('target')));
    });

    $('body').on('click', '.av-modal-close, .btn-modal-close', function (e) {
      _this.close();
    });

    $('body').on('click', '.av-modal', function (e) {
      if ($('.av-modal').is(e.target) && $('.av-modal').has(e.target).length === 0) {
        _this.close();
      }
    });
  }
});
