APP.controller.General = ClassAvanti.extend({
    init: function () {
        this.setup();
        this.start();
        this.bind();
    },

    setup: function () {
        APP.config = {
            accountName: 'decathlonpro'
        }

        this.slickBeneficios = $('.barra-beneficios .wrapper');

        window.lazySizesConfig.expFactor = 0.5;

        this.menuTab = $('.menu-tab');
    },

    start: function () {
        APP.i.util = new APP.core.Util();
        APP.i.Header = new APP.component.Header();
        APP.i.Search = new APP.component.Search({
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
        });

        APP.i.Footer = new APP.component.Footer();

        APP.i.util.removeHelperComplement();
        APP.i.menuHeader = new APP.component.MenuHeader();
        APP.i.minicart = new APP.component.Minicart();
        APP.i.progressDiscount = new APP.component.ProgressDiscount();
        APP.i.dropContent = new APP.component.DropContent();
        APP.i.popup = new APP.component.AvantiModal();

        vtexjs.checkout.getOrderForm().done(function () {
            setTimeout(function () {
                APP.i.accessControl = new APP.component.AccessControl();
            }, 100)
        });

        this.startShelf();
        this.startSlickBeneficios();
        this.loginLogoutLink();
        this.msgLoginHeader();
        this.menuTelevendas();
        this.menuMobAjuda();
    },

    startShelf: function () {
        $('.shelf-item').not('.prateleira > .prateleira .shelf-item').each(function () {
            new APP.component.Shelf({
                scope: $(this)
            });
        })
    },

    startSlickBeneficios: function () {
        if ($(window).width() < 992) {
            this.slickBeneficios.slick({
                dots: false,
                arrows: true,
                autoplay: true,
                slidesToShow: 2,
                autoplaySpeed: 5000,
                prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"><i class="icon icon-arrow-beneficios"></i></button>',
                nextArrow: '<button class="slick-next slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"><i class="icon icon-arrow-beneficios"></i></button>',
                responsive: [{
                    breakpoint: 480,
                    settings: {
                        autoplay: true,
                        slidesToShow: 1,
                    }
                },]
            });
        }
    },

    loginLogoutLink: function () {
        APP.i.util.verifyLogin(function (login) {
            const logged = $('.header-account-content-logged'),
                notLogged = $('.header-account-content-notlogged');

            if (login) {
                logged.show();
                notLogged.hide();
            } else {
                logged.css('display', 'none');
                notLogged.css('display', 'block');
            }
        });
    },

    msgLoginHeader: function () {
        var _this = this;
        var oldText = "JÁ SOU CADASTRADO";
        var newText = "Olá, bem vindo :)";
        var maxLength = 14;

        var interval = setInterval(function () {
            var _selector = $(".header-welcome").find(".welcome");
            var originalText = _selector.text();

            if (originalText.length) {

                _selector.find('em').remove();
                originalText = _selector.text();

                var withoutSpaces = originalText.replace(/\n/g, "");
                withoutSpaces = withoutSpaces.replace(/ /g, "");
                var countCharacters = withoutSpaces.length;

                if (withoutSpaces === oldText) {


                } else {
                    APP.i.util.verifyLogin(function (login) {
                        var finalText, trimText;
                        var emText = "..., SEJA BEM VINDO<em></em>";

                        $(".header-account-content").attr('data-logado', login);
                        if (login) {
                            finalText = withoutSpaces.replace("Olá", "Olá ");
                        } else {
                            finalText = withoutSpaces.replace("Olá", "Olá ");
                            finalText = finalText.replace("Bemvindo", "Bem vindo ");
                            finalText = finalText.replace(",", "");
                            finalText = finalText.replace("!", " !");
                            emText = " <em></em>";
                        }

                        if (login) {
                            trimText = finalText.substr(0, maxLength);
                            if (countCharacters > maxLength) {
                                trimText = trimText;
                            }
                        } else {
                            trimText = finalText;
                        }
                        trimText = trimText + emText;
                        //_selector.html(trimText);
                        $('.header-account-content-logged').find('.msg-login').html(trimText);
                    });
                }
                clearInterval(interval);
            }
        }, 100);
    },

    menuTelevendas: function () {
        setTimeout(function () {
            if ($('#vtex-callcenter').length == 1) {
                $('.header-middle').css({ 'position': 'relative', 'top': '65px', 'border-bottom': '1px solid #CCC', 'padding-bottom': '66px' });
            }
        }, 3000);
    },
//=======================================================================================================================================================================
// Task #16220, insert picture

    menuMobAjuda: function () {
        $('.main-menu-footer-mobile .main-menu-ajuda').on('click', function (e) {
            e.preventDefault();

            var ajuda_wrapper = $(this).parents('.main-menu-footer-mobile').find('.menu-mobile-ajuda-wrapper');

            if (ajuda_wrapper.length == 0) {
                $(this).parents('.main-menu-footer-mobile').append(`<div class="menu-mobile-ajuda-wrapper">
                    <h2 class="menu-mobile-item-wrapper-top">como podemos ajudar?<span class="menu-mobile-ajuda-close"></span></h2>
                    <ul>
                        <li class="menu-mobile-ajuda-email">Nos envie um e-mail para <a href="mailto:corporativo@decathlon.com">corporativo@decathlon.com</a></li>
                        <li class="menu-mobile-ajuda-nossas-lojas">Nossas lojas <a href="/lojas" target="_blank">Encontre a loja mais próxima</a></li>
                        <li class="menu-mobile-ajuda-telefone"><b>Nossos telefones</b><b>+55 (11) 3003-1414 / RJ: 0800 747 1414</b>Segunda à Sábado / 9:00 - 21:00</li>
                    </ul>
                </div>`);

                ajuda_wrapper = $(this).parents('.main-menu-footer-mobile').find('.menu-mobile-ajuda-wrapper');

                ajuda_wrapper.find('.menu-mobile-ajuda-close').on('click', function (e) {
                    e.preventDefault();

                    ajuda_wrapper.hide();
                });
            }

            ajuda_wrapper.show();
        });
    },

    // Task #16220, insert picture
//=======================================================================================================================================================================

    bind: function () {
        var _this = this;

        // $('body').on('click', '.list-selection__item', event => {
        //     event.preventDefault()
        //     const _this = $(event.currentTarget)
        //     const filter = _this.attr('data-filter')
        //     console.log(filter)
        //     const $checkbox = $(`input[type="checkbox"][rel="${filter}"]`)
        //     console.log(checkbox)
        //     console.log(checkbox.parent())
        //     $checkbox.parent().trigger('click')
        // });

        $('body').on('click', '.list-selection__item', function (event) {
            event.preventDefault()
            var obj = $(this),
                val = obj.attr('data-filter')
            $('input[rel="' + val + '"]').prop('checked', false)
            $('input[rel="' + val + '"]').click()
        });

        $('.av-modal--check-status').on('click', '.login-getdata', function (e) {
            e.preventDefault();
            $('.av-modal--check-status').trigger('click')

            $('html, body').animate({
                scrollTop: $('main').offset().top
            }, 'fast');

            vtexid.start();
        })

        _this.menuTab.find('a').on('click', function (e) {
            var self = this;
            var target = $(this).attr('href');

            if (target.indexOf('#') != -1) {
                e.preventDefault();

                $(this).closest('.menu-tab').find('.menu-tab__item').removeClass('menu-tab__item--active');
                $(this).closest('.menu-tab__item').addClass('menu-tab__item--active');
                $(this).closest('.menu-tab').next('.tab-content').find('.tab-pane').removeClass('active');

                $.when($(this).closest('.menu-tab').next('.tab-content').find(target).addClass('active')).then(function (data, textStatus, jqXHR) {
                    if ($(self).closest('.menu-tab').next('.tab-content').find('.tab-pane').find('.slick-slider').length) {
                        $(self).closest('.menu-tab').next('.tab-content').find('.tab-pane').find('.slick-slider').slick('slickGoTo', 1, true);
                    }
                });
            }
        });

        $('.button-login-header').on('click', function () {
            vtexid.start()
        });

        function shelfX(shelf) {
            setTimeout(function () {
                $('.shelf-item .prateleira-suporte-mobile .shelf-item__top .shelf-item__buy-info').each(function () {
                    if ($(this).find('.shelf-item__no-stock').length) {
                        $(this).find('.shelf-item__price').css('display', 'none');
                    }
                });
                if (shelf > 0) {
                    shelfX(shelf - 1);
                }
            }, 2000)
        } shelfX(2);

        function shelfloadX(shelfLoad) {
            $('body').on('click', '.load-more', function () {
                setTimeout(function () {
                    $('.shelf-item .prateleira-suporte-mobile .shelf-item__top .shelf-item__buy-info').each(function () {
                        if ($(this).find('.shelf-item__no-stock').length) {
                            $(this).find('.shelf-item__price').css('display', 'none');
                        }
                    });
                }, 1000);
            });
        } shelfloadX(2);

        // $('h5.Especificações').on('click', function () {
        //     $(this).toggleClass('list__toggle-title');
        //     $(this).next().toggleClass('--hidden')
        // })

    }
});
