APP.component.FilterPriceRange = ClassAvanti.extend({
  init: function (options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup: function (options) {
    this.options = $.extend({
      templatePriceRange:  `<div class="prince-range">
                              <div class="price-range__values">
                                <div class="price-range__value price-range__value--min"></div>
                                <div class="price-range__value price-range__value--max"></div>
                              </div>

                              <div class="prince-range__content"></div>
                            </div>`,

      $scope: function () {
        return $('h5:contains("Faixa de preço")').parent('fieldset')
      },

      classContent: 'prince-range__content',
      classRangeValue: 'price-range__value',

      onChange: function (saveFilter, filter) {
        if (saveFilter) {
          AvantiSearch._delFilter(saveFilter)
        }

        AvantiSearch._addFilter(filter)
        AvantiSearch._refresh()
      }
    }, options)
  },

  start: function () {
    this.createElement()
    this.startPlugin()
  },

  createElement: function () {
    const options = this.options

    const $scope = options.$scope()

    $scope.append(options.templatePriceRange)
  },

  startPlugin: function () {
    const $target = this.getTarget()

    if (typeof $target === 'undefined') {
      return false
    }

    const minValue = this.getMinValue()
    const maxValue = this.getMaxValue()

    noUiSlider.create($target, {
      connect: true,
      step: 1.00,
      start: [
        minValue,
        maxValue
      ],
      range: {
        'min': minValue,
        'max': maxValue
      }
    })
  },

  getTarget: function () {
    const options = this.options

    return $(`.${options.classContent}`)[0]
  },

  getMinValue: function () {
    return this._getValue('first')
  },

  getMaxValue: function () {
    return this._getValue('last')
  },

  _getValue: function (position = 'first') {
    const $scope = this.options.$scope()

    const $label = $scope.find(`label:${position}`)
    const $input = $label.find('input')

    const value = $input.val()
    const result = this._matchValue(value)

    if (position === 'last') {
      return Number(result[1])
    }

    return Number(result[0])
  },

  _matchValue: function (value) {
    const pattern = new RegExp('([0-9.]+)', 'g')

    return value.match(pattern)
  },

  resetSlider: function (min = null, max = null) {
    const $target = this.getTarget()

    $target.noUiSlider.set([
      min || this.getMinValue(),
      max || this.getMaxValue()
    ]);
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

  bind: function () {
    const $target = this.getTarget()

    if (typeof $target === 'undefined') {
      return false
    }

    this.bindUpdate()
    this.bindChange()
  },

  bindUpdate: function () {
    const $target = this.getTarget()

    const $rangeValue = $(`.${this.options.classRangeValue}`)

    $target.noUiSlider.on('update', (values, handle) => {
      const value = values[handle].replace(/\D/g, '')

      $rangeValue
        .eq(handle)
        .text(this._formatPrice(value, 'R$ '))
    })
  },

  bindChange: function () {
    const $target = this.getTarget()

    $target.noUiSlider.on('change', (values) => {
      const filter = `fq=P:[${values[0]} TO ${values[1]}]`

      this.options.onChange(this.saveFilter, filter)

      this.saveFilter = filter
    })
  }
})
