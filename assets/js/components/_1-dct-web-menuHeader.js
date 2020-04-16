APP.component.MenuHeader = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
    this.bind()
  },

  setup: function() {
    this.scope = $('.header-bottom__menu')
    this.vtexDepartmentNavigator = $(
      '#vtexDepartmentNavigator .menu-departamento',
    )
    this.menuMobileScope = $('.header__mobile-menu__menu--scroll')
    this.dynamicDrops = this.scope.find('.dynamic-drop')
    this.dynamicDropsFinished = 0
    this.slickTopBanner = $('.home-top-banner .slick-banner-full')
    this.slickTopBannerMobile = $('.home-top-banner__mobile .slick-banner-full')
    this.slickVitrine = $('.home-products-1 .prateleira > ul')
    this.slickVitrine2 = $('.home-products-2 .prateleira > ul')
    this.slickInformativo = $('.slick-informative')
    this.slickBeneficios = $('.barra-beneficios .wrapper')
  },

  start: function() {
    var self = this
    this.buildMenu()
    this.specialClasses()
  },

  buildMenu: function() {
    const _this = this
    $(
      '#vtexDepartmentNavigator .menu-departamento > h3, #vtexDepartmentNavigator .menu-departamento > ul',
    ).each((index, e) => {
      const _this = $(e)
      const classEl = _this.attr('class')
      _this.find('> a').attr('class', classEl)
      _this
        .removeClass('even')
        .find('> a')
        .removeClass('even')
    })
    const categories = $(
        '#vtexDepartmentNavigator .menu-departamento > h3',
      ).find('> a'),
      categoriesTxt = categories.text()
    // $('#main-menu .main-menu-content .main-menu-level-1').prepend('<ul class="main-menu-dynamic-list"><li class="main-menu-item-esportes"><a href="javascript:;"><span>' + categories.length + '</span> ESPORTES</a></li></ul>')
    $('#main-menu .main-menu-content .main-menu-level-1').prepend(
      '<ul class="main-menu-dynamic-list"><li class="main-menu-item-esportes"><a href="javascript:;"><span>65</span> ESPORTES</a></li></ul>',
    )
    $('#main-menu .main-menu-content .main-menu-level-1').prepend(
      '<ul class="main-menu-cartao-presente"><li class="main-menu-cartao-presente"><a href="https://www.decathlonpro.com.br/cartao-presente">CARTÃO PRESENTE</a></li></ul>',
    )

    categories.sort(function(a, b) {
      return a.innerText === b.innerText
        ? 0
        : a.innerText < b.innerText
        ? -1
        : 1
    })

    /* POPULA O NIVEL 2 OS ESPORTES */
    $('.main-menu-item-esportes').on('click', '> a', e => {
      const _this = $(e.currentTarget)
      e.preventDefault()

      const categoryUrl = categories.attr('href')

      $('.main-menu-level-2').addClass('opened')
      $('.main-menu-back').addClass('back-level-2')
      if (!$('.menu-cat-title-level-2').length) {
        $('.main-menu-header').append(
          '<span class="menu-cat-title menu-cat-title-level-2"></span>',
        )
      }

      //$('.menu-cat-title-level-2').html(categories.length + ' Esportes').show()
      $('.menu-cat-title-level-2')
        .html('65 Esportes')
        .show()

      if ($('.main-menu-filter-list').text().length < 1) {
        /* PEGA A PRIMEIRA LETRA DOS ESPORTES */
        let filterLetter = []

        for (var i = 0; i < categories.length; i++) {
          const catName = categories[i].innerHTML,
            firstLetter = catName.charAt(0)

          filterLetter.push(firstLetter)
        }

        filterLetter = filterLetter.filter((elem, index, array) => {
          return filterLetter.indexOf(elem) === index
        })

        /* AGRUPA ESPORTES POR LETRA */
        for (var k = 0; k < filterLetter.length; k++) {
          setTimeout(function() {
            $('.main-menu-filter-list ul')
              .sort(asc_sort)
              .appendTo('.main-menu-filter-list')

            function asc_sort(a, b) {
              return $(b).text() < $(a).text() ? 1 : -1
            }
          }, 1000)

          $('.main-menu-filter-list').append(
            '<ul class="main-menu-filter-letra ' +
              filterLetter[k] +
              '"><li class="letter-title">' +
              filterLetter[k] +
              '</li></ul>',
          )
          for (var w = 0; w < categories.length; w++) {
            if (categories[w].innerHTML.charAt(0) == filterLetter[k]) {
              $('.main-menu-filter-list')
                .find('[class*="' + filterLetter[k] + '"]')
                .append(
                  '<li class="esporte-item ' +
                    categories[w].className +
                    '"><a href="' +
                    categories[w].href +
                    '" rel="" class="' +
                    categories[w].className +
                    '">' +
                    categories[w].innerHTML +
                    '</a></li>',
                )
            }
          }
        }

        $('.esporte-item').each((index, e) => {
          const target = $(e)
          const categoryUrl = target.find('>a').attr('href')
          target
            .removeClass('even')
            .find('>a')
            .removeClass('even')
          $.ajax({
            url: categoryUrl + '?lid=546494bf-6dbf-4327-a92f-ce839669bf43',
            type: 'GET',
            target: target,
            success: function(data) {
              // console.log(data)
              // var string = data;
              // var pattern = new RegExp('(categoryId:")(.*)(",categoryName)', 'gi');
              // var categoryId = pattern.exec(string)[2];
              // target.attr('rel', categoryId).find('>a').eq(0).attr('rel', categoryId);
              target
                .attr('rel', data.split('"categoryId":"')[1].split('"')[0])
                .find('>a')
                .eq(0)
                .attr('rel', data.split('"categoryId":"')[1].split('"')[0])
            },
          })

          const classEl = target.find('>a').attr('class'),
            classNavigator = $('#vtexDepartmentNavigator .menu-departamento')
              .find('[class*="' + classEl + '"]')
              .not('h3')
              .attr('class')
              .split(' ')[0]

          if (classNavigator == classEl) {
            target.addClass('with-sub')
          }
        })

        $('.esporte-item.with-sub').on('click', '> a', e => {
          e.preventDefault()
          const _this = $(e.currentTarget)
          $('.menu-cat-associadas-div').removeClass('hasAssociate')
          $('.main-menu-back')
            .removeClass('back-level-2')
            .addClass('back-level-3')
          $('.menu-cat-title-level-2').hide()
          if (!$('.menu-cat-title-level-3').length) {
            $('.main-menu-header').append(
              '<span class="menu-cat-title menu-cat-title-level-3"></span>',
            )
          }

          $('.menu-cat-title-level-3').show()

          if ($('.main-menu-subcat-subs').length) {
            $('.main-menu-subcat-subs').html(
              '<li class="main-menu-subcat-item main-menu-subcat-item-all"><a href="" ref="all">TODOS OS PRODUTOS</a></li>',
            )
          }

          const classEl = _this.attr('class'),
            subCatItem = $('#vtexDepartmentNavigator .menu-departamento')
              .find('[class="' + classEl + '"]')
              .not('h3')
              .find('>li>a'),
            levelClass = $('#main-menu')
              .find('[class*="main-menu-level"]')
              .last()
              .attr('class')
              .split('-')[3]
              .split(' ')[0]

          $('.menu-cat-title-level-3').html(_this.text())

          if ($('.menu-cat-associadas-wrapper').length) {
            $('.menu-cat-associadas-wrapper').html('')
          }

          if (!$('.main-menu-subcat').length) {
            $('#main-menu .main-menu-content').append(
              '<div class="main-menu-subcat main-menu-level-' +
                (parseInt(levelClass) + 1) +
                '"><div class="main-menu-subcat-subs"><li class="main-menu-subcat-item main-menu-subcat-item-all"><a href="" ref="all">TODOS OS PRODUTOS</a></li></div></div>',
            )
            $('.main-menu-subcat').prepend(
              '<div class="menu-img-wrapper"><div class="menu-img-wrapper-img"></div><div class="menu-img-wrapper-link"></div></div>',
            )
            $('.main-menu-subcat').append(
              '<div class="menu-cat-associadas-div"><h3>ESPORTES ASSOCIADOS</h3><ul class="menu-cat-associadas-wrapper"></ul></div>',
            )
          }

          /* INSERE A THUMB DA CATEGORIA */

          var imgCat =
            '<img src="/arquivos/thumb-categoria_' +
            _this.attr('rel') +
            '.png">'
          var linkCat =
            '<a href="' +
            _this.attr('href') +
            '">VER TUDO EM <br><span>' +
            _this.text() +
            '</span></a>'
          $('.menu-img-wrapper-img').html(imgCat)
          $('.menu-img-wrapper-link').html(linkCat)

          $('.main-menu-subcat-item-all>a').attr('href', _this.attr('href'))

          for (var i = 0; i < subCatItem.length; i++) {
            const subCatItemName = subCatItem[i].innerHTML,
              subCatItemLink = subCatItem[i].href
            $('#main-menu')
              .find('.main-menu-subcat-subs')
              .prepend(
                '<li class="main-menu-subcat-item"><a href="' +
                  subCatItemLink +
                  '">' +
                  subCatItemName +
                  '</a></li>',
              )
          }

          setTimeout(function() {
            $('.main-menu-subcat').addClass('opened')
          })

          /* POPULA OS ESPORTES ASSOCIADOS */
          $.ajax({
            url:
              '/decathlonpro/dataentities/EM/search?_fields=categoriaId,categoriaName,categoriasAssociadasId&_where=categoriaId=' +
              _this.attr('rel'),
            type: 'GET',
            success: function(data) {
              const catAssociadas = data
              if (catAssociadas.length > 0) {
                const catAssociadasId = catAssociadas[0].categoriasAssociadasId.split(
                  ';',
                )

                if (catAssociadasId != undefined) {
                  for (var i = 0; i < catAssociadasId.length; i++) {
                    const catAssociadaNome = $(
                        '.main-menu-filter-list > ul > li',
                      )
                        .find('[rel="' + catAssociadasId[i] + '"]')
                        .text(),
                      catAssociadaUrl = $('.main-menu-filter-list > ul > li')
                        .find('[rel="' + catAssociadasId[i] + '"]')
                        .attr('href')
                    $('.menu-cat-associadas-wrapper').append(
                      '<li rel="' +
                        catAssociadasId[i] +
                        '"><a href="' +
                        catAssociadaUrl +
                        '"><img src="/arquivos/thumb-categoria_' +
                        catAssociadasId[i] +
                        '.png"><span>' +
                        catAssociadaNome +
                        '</span></a></li>',
                    )
                    $('.menu-cat-associadas-div').addClass('hasAssociate')
                  }
                }
              }
            },
          })
        })

        APP.i.MenurFilter = new APP.component.MenuFilter()
      }

      /* INSERE OS ESPORTES EM DESTAQUE NO NIVEL 2 DO MENU */

      if (!$('.container-esportes-destaque .esporte-destaque').length) {
        const esportesDestaque = $('.main-esportes-destaque-hidden')
          .text()
          .split(';')

        var _interval = setInterval(function() {
          if (!$('.esporte-destaque > a > span').text().length > 0) {
            for (var i = 0; i < esportesDestaque.length; i++) {
              if (esportesDestaque[i] != undefined) {
                const esportesDestaqueLink = $('.esporte-item')
                    .find('>[rel="' + esportesDestaque[i] + '"]')
                    .attr('href'),
                  esportesDestaqueNome = $('.esporte-item')
                    .find('>[rel="' + esportesDestaque[i] + '"]')
                    .text()

                $('.container-esportes-destaque').append(
                  '<li class="esporte-destaque" rel="' +
                    esportesDestaque[i] +
                    '"><a href="' +
                    esportesDestaqueLink +
                    '"><img src="/arquivos/thumb-categoria_' +
                    esportesDestaque[i] +
                    '.png"><span>' +
                    esportesDestaqueNome +
                    '</span></a></li>',
                )
              }
            }
            clearInterval(_interval)
          }
        }, 1500)
      }
    })

    $('.main-menu-back').on('click', e => {
      const _this = $(e.currentTarget)
      var backClassAdd = _this.attr('class').split(' ')[0]
      if (!_this.hasClass('back-level-2') && !_this.hasClass('back-level-3')) {
        $('.main-menu-bar__link').click()
      }
      if (_this.hasClass('back-level-3')) {
        _this.removeClass('back-level-3').addClass('back-level-2')
        $('#main-menu')
          .find('.main-menu-level-3')
          .removeClass('opened')
        $('.menu-cat-title-level-3').hide()
        $('.menu-cat-title-level-2').show()
      } else if (_this.hasClass('back-level-2')) {
        _this.removeClass('back-level-2')
        $('#main-menu')
          .find('.main-menu-level-2')
          .removeClass('opened')
        //$('.menu-cat-title-level-3').hide()
        $('.menu-cat-title-level-2').hide()
      }
    })
  },

  buildMenuMobile: function() {
    var _this = this,
      itens = $('.header-bottom__main-menu > .menu__item')

    itens.each(function() {
      var self = $(this),
        link = self.find('> .menu__link'),
        topLink = $(
          '<li class="menu__item"><a href="' +
            link.attr('href') +
            '" class="menu__link">' +
            link.text() +
            '</a></li>',
        ),
        drop = self.find('.header-bottom__drop-menu .menu__item')

      topLink.appendTo(_this.menuMobileScope)

      if (drop.length > 0) {
        var dropDiv = $(
            '<div class="header__mobile-menu__menu--scroll__drop"></div>',
          ),
          dropList = $(
            '<ul class="header__mobile-menu__menu--scroll-drop menu__list"></ul>',
          )

        topLink.addClass('drop')
        dropDiv.appendTo(topLink)
        dropList.appendTo(dropDiv)

        drop.each(function() {
          var newItem = $('<li class="menu__item">' + $(this).html() + '</li>')
          newItem.appendTo(dropList)
        })
      }
    })
  },

  specialClasses: function() {
    if ($(window).width() > 767 && $(window).width() < 992) {
      $('.header-item-minicart').html(
        '<a class="header-link header-link-minicart header-link-minicart-tablet" href="javascript:;"><span></span></a>',
      )
      $('.search-mobile-button')
        .removeClass('search-mobile-button')
        .addClass('search-mobile-button-tablet')
      $('.header-search').addClass('header-search-tablet')
      $('.minicart').addClass('minicart-tablet')
    } else {
      $('.minicart').removeClass('minicart-tablet')
      $('.header-item-minicart').html(
        '<a class="header-link header-link-minicart" href="javascript:;">MEU CARRINHO<span></span></a>',
      )
    }

    if ($(window).width() < 992) {
      $('.header-search').appendTo('.header-middle')
    } else {
      $('.header-search').insertBefore('.header-links')
    }

    if ($(window).width() < 768) {
      $('.header-item-minicart').html(
        '<a class="header-link header-link-minicart header-link-minicart-mobile" href="javascript:;"><span></span></a>',
      )
      $('.minicart').addClass('minicart-mobile')
      $('.main-menu-back').addClass('main-menu-back-mobile')
      $('.header-link-minicart').on('click', e => {
        e.preventDefault()
        $('.minicart').addClass('hovered')
      })
    }

    $('.search-mobile-button, .search-mobile-button-tablet').on(
      'click',
      function() {
        $(this).toggleClass('opened')
        $('.header-search').toggleClass('opened')
      },
    )
  },

  bind: function() {
    var self = this
    this.menuMobileScope.on('click', '> .menu__item', function(e) {
      var self = $(this)
      if (
        !self
          .find('.menu__link, .menu__link .menu__item, .menu__item .menu__link')
          .is(e.target)
      ) {
        var drop = self.find('.header__mobile-menu__menu--scroll__drop')
        if (drop.length > 0) {
          if (self.hasClass('open')) {
            self.removeClass('open')
          } else {
            self.addClass('open')
          }
          drop.slideToggle()
        }
      }
    })

    $('.before-top').on('click', 'span', e => {
      const _this = $(e.currentTarget)
      _this.closest('.before-top').addClass('closed')
      $('#main-menu, header').css('top', '0')
      $('main#main').css('margin-top', '66px')
    })

    $('.main-menu-bar').on('click', '.main-menu-bar__link', e => {
      const _this = $(e.currentTarget)
      $('body').toggleClass('menu-opened')
      $('#main-menu').toggleClass('menu-opened')
      if (_this.hasClass('main-menu-bar__link--closed')) {
        if ($(window).width() < 992) {
          $(
            self.slickTopBannerMobile,
            self.slickBeneficios,
            self.slickVitrine,
          ).slick('slickPause')
        } else {
          $(self.slickTopBanner).slick('slickPause')
        }
      } else {
        self.slickTopBanner.slick('slickPlay')
        if ($(window).width() < 992) {
          $(
            self.slickTopBannerMobile,
            self.slickBeneficios,
            self.slickVitrine,
          ).slick('slickPlay')
        } else {
          $(self.slickTopBanner).slick('slickPlay')
        }
      }
      _this
        .toggleClass('main-menu-bar__link--open')
        .toggleClass('main-menu-bar__link--closed')
      _this.closest('.main-menu-bar').toggleClass('main-menu-bar--open')
    })

    $('.header-links')
      .find('>ul>li')
      .each((index, e) => {
        const _this = $(e)
        _this.on('mouseenter', e => {
          $('.header-links')
            .find('>ul>li')
            .removeClass('hovered')
          $('.header-links')
            .find('>div')
            .removeClass('hovered')
          _this.addClass('hovered')
          var classEl = _this
            .attr('class')
            .replace('hovered', '')
            .split('-')[2]
          $('.header-links')
            .find('>[class*=' + classEl + ']')
            .not('li, a')
            .addClass('hovered')
            .show('fast')
          $('.minicart-footer').removeClass('hovered')
        })
      })

    $('.header-links').on('mouseleave', e => {
      $('.header-links')
        .find('>ul>li')
        .removeClass('hovered')
      $('.header-links')
        .find('>div')
        .removeClass('hovered')
    })

    $(window).resize(function() {
      self.specialClasses()
    })
  },
})
