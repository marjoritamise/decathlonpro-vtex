APP.component.ModalNewsletter = ClassAvanti.extend({
  init: function (options) {
    this.setup(options)
    this.start()
    this.bind()
  },

  setup: function (options) {
    this.options = $.extend({
      $scope: $('.av-modal__form'),
      $form: $('.modal__form'),

      classSuccess: 'footer-newsletter--success',
      classLoading: 'footer-newsletter--loading',
      classButtonSubmit: 'footer-newsletter__submit',
      classError: 'footer-newsletter__input--error',

      onSuccess: function () {}
    }, options)
  },

  start: function () {
  },

  bind: function () {
    this.bindSubmit()
  },

  bindSubmit: function () {
    this.options.$form
      .on('submit', e => {
        e.preventDefault()
      })
      .validate({
        errorClass: this.options.classError,
        errorPlacement: (error, element) => {
          // empty
        },
        submitHandler: form => {
          $(`.${this.options.classButtonSubmit}`).attr('disabled', 'disabled')

          this._submit(form)

          return false
        }
      })
  },

  _submit: function (form) {
    const url = this.options.$form.attr('action')
    const type = this.options.$form.attr('method')
    const data = JSON.stringify(this.options.$form.serializeObject())

    this.options.$scope.addClass(this.options.classLoading)

    $.ajax({
      url,
      type,
      data,
      headers: {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.options.$scope.toggleClass(this.options.classSuccess)
      this.options.$scope.removeClass(this.options.classLoading)
      this.options.onSuccess()

    }, error => {
      throw new Error(error)

      this.options.$scope.removeClass(this.options.classLoading)
      $(`.${this.options.classButtonSubmit}`).removeAttr('disabled')
    })
  }
})
