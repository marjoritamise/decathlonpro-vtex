APP.component.Shelf = ClassAvanti.extend({
    init: function (settings) {
        this.settings = settings;
        this.setup();
        this.start();
        this.bind();
    },

    setup: function () {

        this.settings = $.extend({
            scope: [],
            content: ''
        }, this.settings);

        this.scope = this.settings.scope;
        this.content = this.settings.content;
        this.mainImage = this.scope.find('.shelf-item__img img');
        this.addCartBtn = this.scope.find('.shelf-item__btn-buy');
        this.productId = this.scope.attr('data-product-id');
        this.skuContainerCor = this.scope.find('.shelf-item__sku--cor');
        this.skuContainerTamanho = this.scope.find('.shelf-item__sku--tamanho');
        this.formatedPrice = this.scope.find('.shelf-item__buy-info .decimal');
        this.flagDiscount = this.scope.find('.discount-percent');
    },

    start: function () {
        var _this = this;
        this.priceFormat();
        this.setFlagDiscount();
        setTimeout(function () {
            _this.showSkus();
        }, 50)
        this.quickBuy();
        APP.i.modal = new APP.component.AvantiModal();
    },

    priceFormat: function () {
        if (this.formatedPrice.length < 1) {
            var priceTag = this.scope.find('.best-price__no-discount'),
                priceTagParts = priceTag.text().split(','),
                priceHtml = '<div class="price">' + priceTagParts[0] + '</div>,<div class="decimal">' + priceTagParts[1] + '</div>',

                priceTagDiscount = this.scope.find('.best-price__discount'),
                priceTagDiscountParts = priceTagDiscount.text().split(','),
                priceDiscountHtml = '<div class="price">' + priceTagDiscountParts[0] + '</div>,<div class="decimal">' + priceTagDiscountParts[1] + '</div>';

            priceTag.html(priceHtml);
            priceTagDiscount.html(priceDiscountHtml);
        }
    },

    setFlagDiscount: function () {
        /* console.log();
         if(this.flagDiscount.text() == '0') {
             this.flagDiscount.addClass('hide');
         }*/
    },

    showSkus: function () {
        var _this = this,
            id = _this.productId,
            skusCorArray = [];

        vtexjs.catalog.getProductWithVariations(id).done(function (product) {
            if (!_this.skuContainerCor.hasClass('slick-initialized')) {
                _this.skuContainerCor.html('')
                for (let i = 0; i < product.skus.length; i++) {
                    if (skusCorArray.indexOf(product.skus[i].dimensions.Cor) === -1) {
                        let img = product.skus[i].image,
                            color = (product.skus[i].dimensions.Cor) ? product.skus[i].dimensions.Cor.replace(' ', '-') : false;

                        if (color) {
                            skusCorArray.push(product.skus[i].dimensions.Cor);
                            _this.skuContainerCor.append(
                                `<a href="javascript:;" class="skuSelectorCor cor-${color}" data-sku-color="${color}" data-image="${img.replace('-500-500', '-200-200')}">
                                <img data-src="${img.replace('-500-500', '-200-200')}" class="lazyload shelf-item__sku-image" />
                            </a>`);

                        }
                    }
                }
            }

            if (_this.scope.width() > 190) { //desk
                if (_this.skuContainerCor[0].className.indexOf('slick') == -1) {
                    if (_this.skuContainerCor.find('a').length > 3) {
                        _this.skuContainerCor.slick({
                            dots: false,
                            arrows: true,
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            autoplay: false,
                            infinite: false
                        })
                    }
                }
            } else {
                if (_this.skuContainerCor[0].className.indexOf('slick') == -1) {
                    if (_this.skuContainerCor.find('a').length > 1) {
                        _this.skuContainerCor.slick({
                            dots: false,
                            arrows: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: false,
                            infinite: false
                        })
                    }
                }
            }
            if (product.dimensionsMap.Cor != null) {
                if (product.dimensionsMap.Cor.length == 1) {
                    _this.skuContainerCor.hide();
                }
            }

        })
    },

    quickBuy: function () {
        var _this = this;

        //quickbuy modal na pagina de listagem
        this.addCartBtn.on('click', function (e) {
            e.preventDefault();
            var addToCartBtn = $(this);

            if (addToCartBtn.attr('href').indexOf('lid') <= -1) {
                var href = addToCartBtn.attr('href') + '?lid=96a1113d-4b7a-47fe-ad80-92cfdcbe8a5f';
            } else {
                var href = addToCartBtn.attr('href');
            }

            $('.av-modal--quick-buy').find('iframe').attr('src', href);

            APP.i.modal.open($('.av-modal--quick-buy'));

            /* setTimeout(function(){
              APP.i.util.verifyLogin(function(loggedIn){
                  if (loggedIn) {
                      if (APP.i.accessControl.userPermission == "Aprovado") {
                          if (addToCartBtn.attr('href').indexOf('lid') <= -1) {
                              var href = addToCartBtn.attr('href') + '?lid=96a1113d-4b7a-47fe-ad80-92cfdcbe8a5f';
                          } else {
                              var href = addToCartBtn.attr('href');
                          }
  
                          $('.av-modal--quick-buy').find('iframe').attr('src', href);
  
                          APP.i.modal.open($('.av-modal--quick-buy'));
  
                      } else if (APP.i.accessControl.userPermission == "naoCadastrado") {
                          APP.i.modal.open($('.av-modal--register'));
                          APP.i.modal.resize($('.av-modal--register'));
                      } else if (APP.i.accessControl.userPermission == "Pendente") {
                          APP.i.modal.open($('.av-modal--pending'));
                          APP.i.modal.resize($('.av-modal--pending'));
                      } else if (APP.i.accessControl.userPermission == "Reprovado") {
                          APP.i.modal.open($('.av-modal--disapproved'));
                          APP.i.modal.resize($('.av-modal--disapproved'));
                      } else {
                          APP.i.modal.open($('.av-modal--register'));
                          APP.i.modal.resize($('.av-modal--register'));
                      }
                  } else {
                      APP.i.modal.open($('.av-modal--check-status'));
                      APP.i.modal.resize($('.av-modal--check-status'));
                  }
              })
          }, 100); */

        })
    },

    bind: function () {
        var _this = this;

        this.scope.on('click', '.skuSelectorCor', function () {
            let newImg = $(this).attr('data-image'),
                colorSku = $(this).attr('data-sku-color'),
                linkQuickBuy = `${$(this).closest('.shelf-item').find('.shelf-item__hidden-link').val()}?lid=96a1113d-4b7a-47fe-ad80-92cfdcbe8a5f&aSku=Cor:${colorSku}`,
                linkSku = `${$(this).closest('.shelf-item').find('.shelf-item__hidden-link').val()}?aSku=Cor:${colorSku}`;

            /* troca img */
            $(this).closest('.shelf-item').find('.shelf-item__img-current img').attr('src', newImg);

            /* troca link */
            $(this).closest('.shelf-item').find('.shelf-item__btn-buy').attr('href', linkQuickBuy);
            $(this).closest('.shelf-item').find('.shelf-item__img-current').attr('href', linkSku);
            $(this).closest('.shelf-item').find('.shelf-item__title a').attr('href', linkSku);

            /* troca thumb atual */
            $('.shelf-item__sku--cor a').removeClass('current');
            $(this).addClass('current');
        });

        this.scope.on('click', '.shelf-item__qty-minus', function () {
            var parent = $(this).parent();
            if (parent.find('input').val() > 1) {
                parent.find('input').val(parseInt(parent.find('input').val()) - 1);
            }
        });

        this.scope.on('click', '.shelf-item__qty-plus', function () {
            var parent = $(this).parent();
            parent.find('input').val(parseInt(parent.find('input').val()) + 1);
        });

        /*        setTimeout(function(){
                console.log(_this.scope.outerWidth())
                console.log(_this.scope.find('.shelf-item__title').text())
                },1000)*/

    }


})
