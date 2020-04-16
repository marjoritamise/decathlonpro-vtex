APP.component.Search = ClassAvanti.extend({
  init: function (options) {
    this.setup(options);
    this.start();
    this.bind();
  },

  setup: function (options) {
    this.options = $.extend({
      delay: 300,
      maxRows: 12,

      $scope: $('.header-search'),
      $input: $('.header-search__input'),
      $button: $('.header-search__button'),
      $mobIsVisible: $('.header__menu-bar'),

      classOpen: 'header-search--open',
      classTarget: 'search-target',
      classTargetList: 'search-target__list',
      classTargetListItem: 'search-target__item',
      classTargetListItemImage: 'search-target__item--image',
      classTargetListLink: 'search-target__link'
    }, options)
  },

  start: function () {
  },

  bind: function () {
    this.bindClickOutsideSearch();
    this.bindSearchSubmit();
    this.bindSearch();
  },

  bindClickOutsideSearch: function () {
    $(document).on('click', (e) => {
      const $closeBox = this.options.$scope;

      if (!$closeBox.is(e.target) && $closeBox.has(e.target).length === 0) {
        $('body').removeClass(this.options.classOpen);

        this.options.$scope.find(`.${this.options.classTarget}`)
          .html('')
          .hide()
          .css({
            height: ''
          });
      }
    });
  },

  bindSearchSubmit: function () {
    this.options.$button.on('click', (e) => {
      e.preventDefault();

      const val = this.options.$input.val();

      if (val !== '') {
        this.submitSearch(val);

      } else {
        this.options.$input.focus();
      }
    });
  },

  bindSearch: function () {
    let delay = null;

    this.options.$input.on('keyup', (e) => {
      e.preventDefault();

      const _this = $(e.currentTarget);
      const val = _this.val();
      const code = e.keyCode || e.which;

      if (code === 13 && val !== '') {
        this.submitSearch(val);

        return;
      }

      clearTimeout(delay);

      delay = setTimeout(() => {
        if (val === '') {
          this.options.$scope.find(`.${this.options.classTarget}`)
            .html('')
            .hide()
            .css('height', '');

          return;
        }

        this.getSearchResult(val);
      }, this.options.delay);
    });
  },

  submitSearch: function (terms) {
    const urlTerms = encodeURI(terms.trim());

    window.location = `/${urlTerms}`;
  },

  getSearchResult: function (terms) {
    $.ajax({
      url: '/buscaautocomplete',
      type: 'get',
      data: {
        maxRows: this.options.maxRows,
        productNameContains: terms
      }
    }).then((response) => {
      const items = response.itemsReturned;

      const $listResult = $(`<ul class="${this.options.classTargetList}" />`)

      items.map(item => {
        const { name, href, thumb } = item;
        const $thumb = this._changeImageSize(thumb, 50, 25);

        const $contentTitle = $('<span />').text(name);

        const $link = $(`<a />`, {
          class: this.options.classTargetListLink,
          href
        });

        $link.append($thumb);
        $link.append($contentTitle);

        const $item = $(`<li class="${this.options.classTargetListItem}" />`);
        if ($thumb !== '') {
          $item.addClass(this.options.classTargetListItemImage);
        }

        $item.append($link);
        $listResult.append($item);
      });

      this.options.$scope.find(`.${this.options.classTarget}`)
        .html($listResult)
        .show();

      if (this._isMob()) {
        this._setWindowHeight();
      }
    });
  },

  _changeImageSize: function (image, newSize, actualSize) {
    return image
      .replace(`-${actualSize}-${actualSize}`, `-${newSize}-${newSize}`)
      .replace(`width="${actualSize}"`, `width="${newSize}"`)
      .replace(`height="${actualSize}"`, `height="${newSize}"`);
  },

  _isMob: function () {
    if (this.options.$mobIsVisible.is(':visible')) {
      return true;
    }

    return false;
  }
});
