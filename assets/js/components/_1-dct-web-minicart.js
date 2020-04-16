APP.component.Minicart = ClassAvanti.extend({
  init: function (options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup: function (options) {
    this.options = $.extend({
      thumbWidth: 40,
      thumbHeight: 40,
      attemptsError: 2,

      template: (variables) => {
        return `<li class="minicart-produt__item">
                  <div class="minicart-product__image">
                    <a href="${variables.link}" class="minicart-product__link">
                      <img src="${variables.image}" alt="${variables.name}" />
                    </a>

                    <div class="minicart-controls">
                      <div class="minicart-control minicart-control--items">${variables.quantity}</div>
                    </div>
                  </div>

                  <div class="minicart-product__info">
                    <h4 class="minicart-product__title">
                      <a href="${variables.link}" class="minicart-product__link">${variables.name}</a>
                    </h4>

                    <div class="minicart-product__best-price">${variables.bestPrice}</div>

                    <div class="minicart-btns">
                      <div class="minicart-control minicart-control--less">-</div>
                      <div class="minicart-control minicart-control--items"><input type="text" class="input-minicart-qtd" value="${variables.quantity}"></div>
                      <div class="minicart-control minicart-control--more">+</div>
                    </div>
                  </div>

                  <div class="minicart-product__delete-wrapper">
                    <button class="minicart-product__delete">EXCLUIR</button>
                    <span>EXCLUIR</span>
                  </div>
                </li>`
      },

      $scope: $('.minicart'),
      $close: $('.minicart-header__close, .minicart-overlay'),
      $open: $('.menu-cart__icon, .header-links__link--cart, .header-links__link--cart'),
      $list: $('.minicart-products'),
      $totalItems: $('.minicart-resume__total-counter, .minicart-header__title>span, .header-links__link--cart .header-links__counter, .menu-cart__total, .header-link-minicart>span'),
      $totalPrice: $('.minicart-resume__total-price-target'),

      classBody: 'body-lock',
      classOpen: 'minicart--open',
      classLoading: 'minicart--loading',
      classItem: 'minicart-produt__item',
      classDelete: 'minicart-product__delete',
      classControlLess: 'minicart-control--less',
      classControlItems: 'minicart-control--items',
      classControlInput: 'input-minicart-qtd',
      classControlMore: 'minicart-control--more'
    }, options)
  },

  start: function () {
    this.populateCart()
  },

  populateCart: function () {
    this.getItemsCart((response) => {

      this.setCart(response)

      this.populate()
    })

  },

  getItemsCart: function (callback) {
    this._showLoading()

    vtexjs.checkout.getOrderForm()
      .then((response) => {
        callback(response)

        this._hideLoading()

      }, function (error) {
        throw new Error(error)
      })
  },

  populate: function () {
    this.options.$list.html('')

    this.totalItems = 0
    this.populateItems()
    this.populateInformations()
    $('.minicart-produt__item').each(function(){
      if($(this).find('.minicart-control--items .input-minicart-qtd').val() > 1) {
        $(this).closest('.minicart-produt__item').find('.minicart-product__best-price').append(' cada')
      }
    })
  },

 populateItems: function () {
    this.cart.items.map(item => {
      const $product = this.options.template({
        link: item.detailUrl,
        image: this._fixImage(item.imageUrl),
        name: item.name,
        bestPrice: this._formatPrice(item.price, 'R$ '),
        listPrice: this._formatPrice(item.listPrice),
        quantity: item.quantity
      })

      this.totalItems += item.quantity
      this.options.$list.append($product)
    })
  },

  populateInformations: function () {
    this.options.$totalItems.html(this.totalItems)
    this.options.$totalPrice.html(this._formatPrice(this.cart.value, 'R$ '))
    if(this.totalItems != 1) {
      $('.minicart-header__title span').append(' ITENS')
    }else{
      $('.minicart-header__title span').append(' ITEM')
    }

    if(this.totalItems < 1) {
      $('.minicart-header__title').html('MEU CARRINHO')
      $('.minicart').addClass('minicart-empty-cart')
      $('.minicart-footer').hide()
    }else{
      $('.minicart').removeClass('minicart-empty-cart')
      $('.minicart-footer').show()
    }
  },

  _showLoading: function () {
    this.options.$scope.addClass(this.options.classLoading)
  },

  _hideLoading: function () {
    this.options.$scope.removeClass(this.options.classLoading)
  },

  _fixImage: function (url) {
    const imageProtocol = this._fixImageProtocol(url)
    const imageResized = this._resizeImage(imageProtocol)

    return imageResized
  },

  _fixImageProtocol: function (url) {
    return url.replace('http:', '')
  },

  _resizeImage: function (url) {
    const pattern = /(-)(\d+)(-)(\d+)/gi
    const replace = `$1${this.options.thumbWidth}$3${this.options.thumbHeight}`

    return url.replace(pattern, replace)
  },

  _formatPrice: function (price, prefix) {
    let priceString = price.toString()

    if (priceString.length < 3) {
      priceString = `0${priceString}`
    }

    let temp = priceString.replace(/([0-9]{2})$/g, ',$1')

    if (temp.length > 6) {
      temp = temp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')

    } else if (temp.length > 9) {
      temp = temp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3')
    }

    if (typeof prefix !== 'undefined') {
      temp = prefix + temp
    }

    return temp
  },

  bind: function () {
    this.bindOpenCart()
    this.bindClose()

    this.bindLess()
    this.bindMore()
    this.bindInputQtd()
    this.bindRemove()
    this.bindOrderUpdate()

    this.bindEmptyCart()

  },

  bindOpenCart: function () {
    this.options.$open.on('click', (e) => {
      e.preventDefault();

      this.openCart();
    });
  },

  openCart: function () {
    this.options.$scope.addClass(this.options.classOpen);
    $('body').addClass(this.options.classBody);
  },

  bindClose: function () {
    this.options.$close.on('click', e => {
      e.preventDefault()

      this.options.$scope.removeClass('hovered')
      $('.header-item-minicart').removeClass('hovered')
      $('body').removeClass(this.options.classBody)
    })
  },

  bindLess: function () {
    this.options.$scope.on('click', `.${this.options.classControlLess}`, e =>
      this.bindControl(e, this._lessCalc))
  },

  _lessCalc: function (items) {
    if (items === 1) {
      return false
    }

    return items - 1
  },

  bindMore: function () {
    this.options.$scope.on('click', `.${this.options.classControlMore}`, e =>
      this.bindControl(e, this._moreCalc))
  },

  _moreCalc: function (items) {
    return items + 1
  },

  bindInputQtd: function () {
    let delay = null;

    this.options.$list.on('keyup', '.input-minicart-qtd', (event) => {
      const _this = $(event.currentTarget)

      const totalItems = Number(_this.val())
      const index = _this.closest(`.${this.options.classItem}`).index()
      const quantity =  _this.val()

      clearTimeout(delay);

      delay = setTimeout(() => {
        if (quantity === false) {
          return false
        }

        if (quantity != '' && quantity > 0){
          this.updateCart(index, quantity)

        } else {
          const quantity = 1
          this.updateCart(index, quantity)

          _this.val('1')
        }
      }, 300);
    })
  },

  bindControl: function (e, calc) {
    e.preventDefault()

    const _this = $(e.currentTarget)

    const $controlItems = _this.parent().find(`.${this.options.classControlItems}`).find('.input-minicart-qtd')
    const totalItems = Number($controlItems.val())
    const index = _this.parents(`.${this.options.classItem}`).index()
    const quantity = calc(totalItems)

    if (quantity === false) {
      return false
    }


    this.updateCart(index, quantity)
  },

  bindRemove: function () {
    $('body').on('click', `.${this.options.classDelete}`, e => {
      e.preventDefault()

      const _this = $(e.currentTarget)

      const index = _this.parents(`.${this.options.classItem}`).index()

      this.updateCart(index, 0, 'removeItems')
    })
  },

  updateCart: function (index, quantity, action = 'updateItems') {
    const item = {
      index: index,
      quantity: quantity
    }

    let attempts = 0

    this._showLoading()

    vtexjs.checkout[action]([item])
      .then(response => {
        this.setCart(response)

        this.populate()
        this._hideLoading()

        attempts = 0

      }, (error) => {
        throw new Error(error)

        if (error.status === 500 && attempts < this.options.attempsError) {
          attempts++
          this._hideLoading()
          this.updateCart(index, quantity, action)
        }
      })

  },

  setCart: function (response) {
    this.cart = {
      value: response.value,
      items: response.items
    }
  },

  itemExists: function (sku) {
    const items = this.cart.items

    return items.filter(item => parseInt(item.id) == sku)
  },

  addCart: function (url, productId, callback) {
    const productIdGiftCard = '11113' //productID cartao presente
    const items = this.cart.items //item minicart
    
    if(items.length > 0) {
      const minicartItem = items[0].productId

      if(productId == productIdGiftCard && minicartItem == productIdGiftCard) {
        $.ajax({
          url: this._changeUrlRedirect(url),
          type: 'GET'
        }).then((response) => {
          this.populateCart()
    
          callback()
        }, (error) => {
          throw new Error(error)
        })
      } else if(productId == productIdGiftCard && minicartItem != productIdGiftCard){
        APP.i.modal.open($('.av-modal--digitalcard'));
        APP.i.modal.resize($('.av-modal--digitalcard'));
      } else if(productId != productIdGiftCard && minicartItem == productIdGiftCard){
        APP.i.modal.open($('.av-modal--digitalcard'));
        APP.i.modal.resize($('.av-modal--digitalcard'));
      } else if(productId != productIdGiftCard && minicartItem != productIdGiftCard) {
        $.ajax({
          url: this._changeUrlRedirect(url),
          type: 'GET'
        }).then((response) => {
          this.populateCart()
    
          callback()
        }, (error) => {
          throw new Error(error)
        })
      }
    } else {
      $.ajax({
        url: this._changeUrlRedirect(url),
        type: 'GET'
      }).then((response) => {
        this.populateCart()
  
        callback()
      }, (error) => {
        throw new Error(error)
      })
    }
  },

  _changeUrlRedirect: function (url) {
    const pattern = /(redirect=)(true)/gi

    return url.replace(pattern, `$1false`)
  },

  bindOrderUpdate: function () {
    $(window).on('orderFormUpdated.vtex', (e, orderForm) => {
      this.setCart(orderForm)
    });
  },

  bindEmptyCart: function () {
    var _this = this
    const contentEmptyCart = `<div class="empty-cart">` +
              `<div class="empty-cart-img">` +
                `<img src="/arquivos/empty-cart-dct.png">`+
              `</div>` +
              `<div class="empty-cart-text">` +
                `<b>Seu carrinho está vazio!</b> `+
                `<br> Escolha algum produto para continuar` +
              `</div>` +
            `</div>`

    $('.minicart').append(contentEmptyCart)
  }
})
