APP.component.ProgressDiscount = ClassAvanti.extend({
  /**
   * Checkout target:
   * - body > div.container.container-main.container-cart > div.checkout-container.row-fluid.cart-active > div.cart-template.full-cart.span12.active > div.summary-template-holder > div > div.span5.totalizers.summary-totalizers.cart-totalizers.pull-right > div
   */
  init: function (options) {
    this.setup(options)
    this.bind()
    this.start()
  },

  setup: function (options) {
    this.options = $.extend({
      template: `<div class="minicart-progressive-discount">
                  <div class="minicart-progressive-discount__wrap">
                    <div class="progressive-discount__bar">
                      <div class="progressive-discount__progress"></div>
                    </div>

                    <div class="progressive-discount__status">
                      <div class="progressive-discount__info">
                        Você possui <span class="progressive-discount__actual-percent"></span>% de desconto no boleto.<br />
                        Faltam <span class="progressive-discount__price"></span> para <span class="progressive-discount__percent"></span>% de desconto no boleto.
                      </div>

                      <div class="progressive-discount__message">
                        <p>Você já possui <span class="progressive-discount__percent"></span>% de desconto no boleto.</p>
                        <p class="progressive-discount--small">Para descontos a cima de R$100.000,00 entre em contato conosco.</p>
                      </div>
                    </div>
                  </div>
                </div>`,

      $target: function (template) {
        return $('.minicart-resume__wrap').append(template)
      },

      classScope: 'minicart-progressive-discount',
      classScopeMax: 'minicart-progressive-discount--max',
      classScopeDiscountValue: 'minicart-progressive-discount--discount-',
      classBar: 'progressive-discount__bar',
      classProgress: 'progressive-discount__progress',
      classDiscountPrice: 'progressive-discount__price',
      classDiscountActualPercent: 'progressive-discount__actual-percent',
      classDiscountPercent: 'progressive-discount__percent',

      discounts: [
        {
          range: [0, 99999],
          discount: 0
        },
        {
          range: [100000, 499999],
          discount: 3
        },
        {
          range: [500000, 1499999],
          discount: 4
        },
        {
          range: [1500000, 2999999],
          discount: 5
        },
        {
          range: [3000000, 4999999],
          discount: 6
        },
        {
          range: [5000000, 99999999],
          discount: 7
        },
        {
          range: [10000000, false],
          discount: 7
        }
      ]
    }, options)
  },

  start: function () {
    this.createProgressiveDiscount()

    this._getPrice(total => this.checkRemaining(total))
  },

  createProgressiveDiscount: function () {
    this.options.$target(this.options.template)
  },

  checkRemaining: function (total) {
    if (total === 0) {
      return false
    }

    const options = this.options

    const discount = this._getDiscount(total)

    const [min, max] = discount.range

    const remainingPercentage = this.getRemainingPercentage(min, max, total)
    const remainingPrice = this.getRemainingPrice(max, total)
    const nextDiscount = discount.nextDiscount || discount.discount

    if (nextDiscount === false || max === false) {
      $(`.${options.classScope}`).addClass(options.classScopeMax)

    } else {
      $(`.${options.classScope}`).removeClass(options.classScopeMax)
    }

    $(`.${options.classScope}`)
      .removeClass((index, className) => this.removeClassDiscountValue(index, className))
      .addClass(`${options.classScopeDiscountValue}${discount.discount}`)

    $(`.${options.classProgress}`).css('width', `${remainingPercentage}%`)
    $(`.${options.classDiscountPercent}`).text(nextDiscount)
    $(`.${options.classDiscountActualPercent}`).text(discount.discount)
    $(`.${options.classDiscountPrice}`).text(remainingPrice)
  },

  _getDiscount: function (total) {
    const discounts = this.options.discounts

    return discounts.reduce((acc, item, index, array) => {
      const [min, max] = item.range

      if (total >= min && (total <= max || max === false)) {
        acc = item

        if (typeof array[index + 1] === 'undefined') {
          acc.nextDiscount = false

          return acc
        }

        acc.nextDiscount = array[index + 1].discount

        if (acc.discount === acc.nextDiscount) {
          acc.nextDiscount = false

          return acc
        }

        return acc
      }

      return acc
    }, {})
  },

  getRemainingPercentage: function (min, max, total) {
    const all = Number(max) - Number(min)
    const diff = Number(total) - Number(min)
    const percentage = Math.round((100 * diff) / all)

    return percentage
  },

  getRemainingPrice: function (max, total) {
    return this._formatPrice(parseInt(Number(max + 1) - Number(total)), 'R$ ')
  },

  _getPrice: function (callback) {
    vtexjs.checkout.getOrderForm()
      .then(response => {
        callback(response.value)

      }, (error) => {
        console.error('Error on get cart products')

        throw new Error(error)
      })
  },

  removeClassDiscountValue: function (index, className) {
    const pattern = `(${this.options.classScopeDiscountValue})([0-9]+)`
    const regex = new RegExp(pattern, 'g')

    return (className.match(regex) || []).join(' ');
  },

  _formatPrice: function (price, prefix) {
    let priceString = price.toString()

    if (priceString.length < 3) {
      priceString = this._padStart(priceString, '000')
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

  _padStart: function (price, pad) {
    var str = price.toString()

    return pad.substring(0, pad.length - str.length) + str
  },

  bind: function () {
    this.bindChangeCart()
  },

  bindChangeCart: function () {
    $(window).on('orderFormUpdated.vtex', (e, orderForm) => {
      const total = orderForm.value

      this.checkRemaining(total)
    })
  }
})
