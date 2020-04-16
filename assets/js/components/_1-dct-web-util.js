APP.core.Util = ClassAvanti.extend({
  getController: function () {
    var controller = jQuery('meta[name=controller]').attr('content');
    return controller ? controller : false;
  },

  _resizeImage: function (url, width, height) {
    const pattern = /(-)(\d+)(-)(\d+)/gi
    const replace = `$1${width}$3${height}`

    return url.replace(pattern, replace)
  },

  verifyLogin: function (callback) {
    if (vtexjs.checkout.orderForm){
      return callback(vtexjs.checkout.orderForm.loggedIn)
      }
    const callbackFunc = callback
    vtexjs.checkout.getOrderForm().then(function(e){
      callbackFunc(e.loggedIn)
    })
  },

  getUserEmail: function () {
      return vtexjs.checkout.orderForm.clientProfileData.email
  },

  redirectUser: function (url) {
      location.href = url
  },

  loginUser: function () {
      vtexid.start({
          returnUrl: '/auth/getdata'
      });

      $('html, body').animate({
          scrollTop: 0
      }, 'slow');
  },

  setDecimal: function (value, string) {
    var dotValue = value.substr(0, value.length - 2) + string + value.substr(value.length - 2, value.length);
    return dotValue;
  },

  removeHelperComplement: function () {
    $('.helperComplement').remove()
  },

  screenW: function () {
    return $(window).width();
  },

  screenH: function () {
    return $(window).height();
  },

  string_to_slug: function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  },

  tabLinks: function () {
    var tabs = $(".tabs__link");

    tabs.click(function () {
      let index = $('.tabs__link').index(this);
      var content = $('.tabs-content div').eq(index);

      tabs.removeClass("active");
      $(this).addClass("active");
      $(".tabs-content").find('div').hide();
      $(content).fadeIn(200);
    });
  }

});
