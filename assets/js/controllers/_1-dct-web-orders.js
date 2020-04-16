APP.controller.Orders = ClassAvanti.extend({
    init: function () {
        this.setup();
        this.start();
        this.bind();

    },

    setup: function () {
        this.myOrders = $('.myorders');
    },

    start: function () {
        var $scope = this;

        this.changeDOM();
        this.startReplaceAddress();
    },

    changeDOM: function() {
        var _this = this;

        $("LINK[href='//io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css']").remove();

        /*DelayedActions.add({
            condition: function () {
                return ($('.myorders-list .ordergroup').length > 0);
            },
            callback: function () {
                $('.row-fluid').removeClass('row-fluid').addClass('row');

                _this.myOrders.find('.payment-info.span4').removeClass('span4').addClass('av-col-lg-4');
                _this.myOrders.find('.shipping-info.span4').removeClass('span4').addClass('av-col-lg-4');
                _this.myOrders.find('.total-info.span4').removeClass('span4').addClass('av-col-lg-4');
                _this.myOrders.find('.top-row .span3').removeClass('span3').addClass('av-col-lg-3');
                _this.myOrders.find('.top-row .span9').removeClass('span9').addClass('av-col-lg-9');
                _this.myOrders.find('.order-detail-items').unwrap('.av-col-lg-12');
                _this.myOrders.find('.order-detail-items').wrap('<div class="av-col-lg-12"></div>');
            },
            persistent: true
        });*/
    },

    startReplaceAddress: function () {
      var replaceAddress = setInterval(function () {
          if (! window.order.orders ) {
              return;
          }

          window.order.orders.forEach(function (order) {
              var logisticsInfo = order.shippingData.logisticsInfo;

              if (logisticsInfo.length == 0) {
                  clearInterval(replaceAddress)
              }

              var loja = {};
              var pedidoNomeLojaRetirar = logisticsInfo[0].selectedSla;
              var orderId = order.orderId;

              window.pickupStoreJson.forEach(function (store) {
                  if (store.nome != pedidoNomeLojaRetirar) {
                      return;
                  }

                  loja = store;
              })

              if (! loja.endereco) {
                  return;
              }

              var container = $('.myo-order-id:contains(' + orderId + ')').closest('.myo-order-card');

              if (container.length) {
                  container.find('.myo-order-header a > span > div').html(loja.nome)
                  container.find('span:contains("Entrega para")').html('Retirar em')
                  container.find('.myo-order-header .relative div.absolute').html(
                      '<p>' + loja.endereco + '</p>' +
                      '<p>' + loja.cidade + ' ' + loja.estado + '</p>' +
                      '<p>' + loja.telefone + '</p>' +
                      '<p>' + loja.horario + '</p>'
                  )
              } else {
                  $('span:contains(' + loja.nome + ')').html(loja.nome + ' - ' + loja.endereco + ' - ' + loja.horario)
              }
          })


          // clearInterval(replaceAddress)
      }, 400);
    },

    bind: function () {

    }
});
