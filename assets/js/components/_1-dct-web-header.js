APP.component.Header = ClassAvanti.extend({
  init: function () {
    this.setup();
    this.start();
    this.bind();
  },

  setup: function () {
    this.$searchIcon = $('.header-links__link--search');
    this.$headerSearch = $('.header-search');
    this.$searchInput = $('.header-search__input');
    this.classBodyLock = 'body-lock';
  },

  start: function () {
  },

  _isMobile: function () {
    return $('.menu-bar').is(':visible')
  },

  bind: function () {
    this.bindSearch();
    this.bindClickMenuFixedSearch();
    this.bindClickOutMenuFixedSearch();
    this.bindOpenMenu();
    this.bindOpenMenuLevelTwo();
    this.bindOpenMenuLevelThree();
    this.bindGoBack();
  },

  bindSearch: function () {
    $('.header-search__button').on('click', (e) => {
      e.preventDefault()

      const val = this.$searchInput.val();

      if (val !== '') {
        this._submitSearch(val);

      } else {
        this.$searchInput.trigger('focus');
      }
    });
  },

  _submitSearch: function (terms) {
    window.location = '/' + encodeURI(terms.trim());
  },

  bindClickMenuFixedSearch: function () {
    this.$searchIcon.on('click', (e) => {
      e.preventDefault();

      this.$headerSearch.toggleClass('header-search--fixed-visible');
      this.$searchInput.trigger('focus');
    });
  },

  bindClickOutMenuFixedSearch: function () {
    $(document).on('click', (e) => {
      if (!this.$headerSearch.is(e.target) &&
          this.$headerSearch.has(e.target).length === 0 &&
          !this.$searchIcon.is(e.target)) {
        this.$headerSearch.removeClass('header-search--fixed-visible');
      }
    });
  },

  bindOpenMenu: function () {
    const menuBarOpenClass = 'menu-bar__link--open';

    const $menu = $('.header-menu');
    const menuOpen = 'header-menu--open';

    $('.menu-bar .menu-bar__link').on('click touch', (e) => {
      e.preventDefault();

      const _this = $(e.currentTarget);

      if (!_this.hasClass(menuBarOpenClass)) {
        $('body').addClass(this.classBodyLock);
        _this.addClass(menuBarOpenClass);
        $menu.addClass(menuOpen)

      } else {
        $('body').removeClass(this.classBodyLock);
        _this.removeClass(menuBarOpenClass);
        $menu.removeClass(menuOpen)
      }
    });
  },

  bindOpenMenuLevelTwo: function () {
    const classClick = 'header-menu__link';
    const classItemActive = 'header-menu__item--active';
    const nextClass = 'header-menu__submenu';

    this.handleEventClick(classClick, classItemActive, nextClass);
  },

  bindOpenMenuLevelThree: function () {
    const classClick = 'submenu__title';
    const classItemActive = 'submenu__wrap--active';
    const nextClass = 'submenu__content';

    this.handleEventClick(classClick, classItemActive, nextClass);
  },

  handleEventClick: function (classClick, classItemActive, nextClass) {
    $(`.${classClick}`).on('click touch', (e) =>
      this.handleBindOpenMenu(e, classItemActive, nextClass));
  },

  handleBindOpenMenu: function (e, classItemActive, nextClass) {
    this._isMobile() && e.preventDefault();

    const _this = $(e.currentTarget);
    const nextClassString = `.${nextClass}`;

    const textBack = _this.text();
    const $next = _this.next(nextClassString);

    this.createSubmenuHead(textBack, $next);

    if (_this.next(nextClassString).length) {
      _this.parent().addClass(classItemActive);

    } else {
      window.location.href = _this.attr('href');
    }
  },

  createSubmenuHead: function (title, $next) {
    const $back = $('<a />', {
      href: '#',
      class: 'header-menu__back'
    }).text('Voltar');

    const $span = $('<span />', {
      class: 'header-menu__link header-menu__link--head'
    }).text(title);

    const $head = $('<li />', {
      class: 'header-menu__item header-menu__item--mobile header-menu__head header-menu__head--back'
    });

    $head
      .append($back)
      .append($span);

    if (!$next.find('.av-row').first().prev().hasClass('header-menu__head--back')) {
      $next.find('.av-row').first().before($head);
    }
  },

  bindGoBack: function () {
    $('body').on('click', '.header-menu__back', (e) => {
      e.preventDefault();

      const _this = $(e.currentTarget);

      if (_this.parents('.submenu__content').length) {
        $('.submenu__wrap').removeClass('submenu__wrap--active');

      } else {
        $('.header-menu__item').removeClass('header-menu__item--active');
      }
    });
  }
});
