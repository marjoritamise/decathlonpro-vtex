APP.component.MenuFilter = ClassAvanti.extend({
  init: function () {
    const self = this;

    self.start();
    self.bind();
  },

  start: function () {
    const self = this;

    self.createMenuFilter();

  },

  createMenuFilter: function () {
    const self = this;

    const htmlSearchMenu = $('<div class="search__menu" />');
    const htmlInputSearchMenu = $('<input class="search__menu-input" placeholder="BUSCAR POR ESPORTE" />', {
      type: 'search'
    });

    const $fieldsetMenuTitle = $('.main-menu-filter-list');
    $fieldsetMenuTitle.before(htmlSearchMenu);

    const $searchMenu = $('.search__menu');
    $searchMenu.html(htmlInputSearchMenu);
  },

  bind: function () {
    const self = this;

    self.bindFilterMenu();
  },

  bindFilterMenu: function () {
    const self = this;

    const $searchMenuInput = $('.search__menu-input');
    const $MenusList = $('.search__menu').next('div').find('>ul>li');
    $searchMenuInput.on('keyup', function () {
      const _this = $(this);

      const find = self._slugify(_this.val().toUpperCase());

      $MenusList.each(function (i, e) {
        const $el = $(this);

        const text = self._slugify($el.text().toUpperCase());

        if (text.indexOf(find) > -1) {
          $el.show();
        } else {
          $el.hide();
        }
      });
    });
  },

  _slugify: function (str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';

    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return str;
  }
});
