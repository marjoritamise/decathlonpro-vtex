APP.component.Select = ClassAvanti.extend({
  init: function (options) {
    var self = this;

    self.options = options;

    if (!self.options.className) {
      self.options.className = 'custom-select';
    }
    if($(window).width() < 992) {
      self.firstOption = 'Ordenar';
    }else{
      self.firstOption = 'SELECIONE AQUI';
    }
    self.titleElement = self.options.className +'__selected';

    self.wrapSelect();
  },

  wrapSelect: function () {
    var self = this;

    if (self.options.selector.length) {
      self.options.selector.each(function (i, e) {
        var _this = $(this);

        var firstOption = _this.find('option:first-child').text();
        var $parent = _this.parent('div');

        if ($parent.hasClass(self.options.className)) {
          return false;
        }

        firstOption = self.firstOption;

        var $wrap = _this.wrap('<div class="'+ self.options.className +'" />').parent();
        $wrap.prepend('<span class="'+ self.titleElement +'">'+ firstOption +'</span>');

        self.bindChange(_this);
      });
    }
  },

  bindChange: function ($element) {
    var self = this;

    $element.on('change', function () {
      var _this = $(this);
      var val = _this.find('option:selected').text();

      console.log('###', val);

      $('.'+ self.titleElement).text(val);
    });
  }
});
