APP.component.ProductImages = ClassAvanti.extend({
  /*
  init: function () {
    this.setup()
    this.start()
    this.bind()
  },

  setup: function () {
    this.$thumbs = $('.thumbs')
    this.$imageTarget = $('.details-content__item--images')
  },

  start: function () {
    this.changeImagesPosition()
    this.slick()
  },

  changeImagesPosition: function () {
    const $productImages = $('<div class="product-images" />')

    this.$thumbs.find('li').each((index, element) => {
      const _this = $(element)
      const src = _this.find('img').attr('src')

      const image =  `<div class="product-images__item">
                        <img src="${APP.i.util._resizeImage(src, 232, 232)}" />
                      </div>`

      $productImages.append(image)
    })

    this.$imageTarget.append($productImages)
  },

  slick: function () {
    var intervalSlick = setInterval(() => {
      if ($._data(window, 'events').resize[0].namespace === '') {
        clearInterval(intervalSlick);

        this.startSlick()
      }
    }, 100);
  },

  startSlick: function () {
    const $slider = $('.product-images');

    $slider
      .on('init', (event, slick) => {
        $slider.show()
      })
      .slick({
        slidesToShow: 5,
        slidesToScrol: 1,
        center: true
      })
  },

  bind: function () {
  }
  */
})
