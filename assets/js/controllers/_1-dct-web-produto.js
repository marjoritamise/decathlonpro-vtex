APP.controller.Produto = ClassAvanti.extend({
  init: function() {
    this.setup();
    this.start();
    this.bind();
  },

  setup: function() {
    //APP.i.ProductImage = new APP.component.ProductImages();
    APP.i.modal = new APP.component.AvantiModal();
    this.skus = $(".product-sku");
    this.skuColor = this.skus.find(".Cor");
    this.skuList = [];
    this.buyButton = $(".product-buy-button .buy-button");
    this.slickDepoimentos = $(".slick-depoimentos");
  },

  start: function() {
    var _this = this;

    this.duplicateProductName();
    this.selectSkuByUrl();
    this.eachSku();
    this.skuCorSlick();
    this.setMarca();
    this.setReference(skuJson.skus[0].sku);
    this.setPreco();
    this.setPrecoQuickbuy();
    this.skuDOM();
    this.setTamanho();
    this.setValor();
    this.buyButtonText();
    this.datailsImagesDom();
    this.datailsBeneficiosDom();
    this.datailsInformacoesDom();
    this.datailsConceitoDom();
    //this.notifyme();
    this.notifymeAllUnavailable();
    this.notifyMeDomUnique();
    this.mobileDom();
    this.skuTamanhoUnico();
    this.skuValorUnico();
    this.startSlickProducts();
    this.startSlickModelo();
    this.createDepoimentos();
    this.selectFirstSKUs();
    //this._bindShipping();
    APP.i.modal = new APP.component.AvantiModal();
  },

  // _bindShipping() {
  //   const changeShippingText = setInterval(() => {
  //     if ($(".freight-zip-box").is(":visible")) {
  //       clearInterval(changeShippingText)

  //       const campoFrete = $(".freight-zip-box").clone()
  //       $(".product-shipping .prefixo").html(campoFrete)
  //       $(".freight-zip-box").attr("placeholder", "Digite seu cep")
  //       $(".product-shipping .freight-btn")
  //         .val("CALCULAR FRETE")
  //         .on("click", e => {
  //           $(".freight-btn").attr("disabled", true)
  //           e.preventDefault()

  //           $(".freight-values").html("")
  //           const intervalShippingValue = setInterval(() => {
  //             if ($(".freight-values").html().length > 0) {
  //               clearInterval(intervalShippingValue)

  //               ga("send", "event", "Produto - Frete", "Click Botão", "Calcular Frete", $(".freight-zip-box").val())

  //               const trHeads = $(".freight-values").find("table > thead > tr")
  //               const trBody = $(".freight-values").find("table > tbody > tr")
  //               trHeads
  //                 .find("th")
  //                 .first()
  //                 .html("Valor")
  //               trHeads
  //                 .find("th")
  //                 .last()
  //                 .html("Entrega")
  //                 .prependTo(trHeads)

  //               let free = false
  //               trBody.each((i, e) => {
  //                 const _this = $(e)
  //                 _this.find("td:nth-child(2)").prependTo(_this)
  //                 _this.find("td:nth-child(3)").remove()

  //                 const $td = _this.find("td")
  //                 const $first = $td.first()
  //                 const $last = $td.last()

  //                 const textFirst = $first.text()
  //                 const [days] = textFirst.match(/(\d.+)(dias úteis)/g)
  //                 const [, type] = /Frete\s([a-zA-Z]+)/g.exec(textFirst)

  //                 if (i === 0 && type === "Loja") {
  //                   $first.text(`Retire na loja à partir de ${days}`)
  //                   _this.css("display", "table-row")
  //                 }

  //                 if (type !== "Loja" && type !== "Retirar") {
  //                   _this.css("display", "table-row")
  //                 }
  //               })

  //               if ($(".freight-values").find(".cep-invalido").length > 0) {
  //                 $(".freight-zip-box").addClass("freight-zip-box--error")
  //               } else {
  //                 $(".freight-zip-box").removeClass("freight-zip-box--error")
  //               }

  //               $(".freight-btn").attr("disabled", false)
  //             }
  //           }, 100)
  //         })
  //     }
  //   }, 100)
  // },
  // _bindShipping() {
  //   const changeShippingText = setInterval(() => {
  //     if ($(".freight-zip-box").is(":visible")) {
  //       clearInterval(changeShippingText)
  //
  //       $(".freight-zip-box").attr("placeholder", "Digite seu cep")
  //       $(".product-shipping .freight-btn").val("CALCULAR FRETE")
  //     }
  //   }, 100)
  // },
  mountTable: function(html) {
    if ($(".product-shipping .freight-values").length) {
      $(".product-shipping .freight-values").remove();
    }

    $(".product-shipping").append(
      '<div class="freight-values" style="display: none">' +
        "<table>" +
        "<thead>" +
        "<tr>" +
        "<th>Entrega</th>" +
        "<th>Valor</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>" +
        "</table>" +
        "</div>"
    );

    $(html)
      .find("tbody tr")
      .each(function() {
        var price = $(this)
          .find("td:nth-of-type(1)")
          .text();
        var description = $(this)
          .find("td:nth-of-type(2)")
          .text();
        var estimated =
          description.split(",")[0].indexOf("Frete Retirar em Loja") != -1
            ? "Retire em loja à partir de " +
              description.split("em ")[2].split(" para")[0]
            : description;
        if (description.indexOf("Frete Loja - Decathlon") == -1) {
          $(".freight-values tbody").append(
            "<tr>" +
              "<td>" +
              estimated +
              "</td>" +
              "<td>" +
              price +
              "</td>" +
              "</tr>"
          );

          $(".freight-values").fadeIn();
        }
      });
  },

  validatePostalCode: function(string) {
    var _this = this;

    var parse = new DOMParser();
    var html = parse.parseFromString(string, "text/html");

    if ($(html).find(".cep-invalido").length) {
      $(".product-shipping").append(
        `<span class="product-shipping__error" style="color: tomato; display: none">Não é possível calcular o valor do Frete para o CEP informado.</span>`
      );
      $(".product-shipping__error").fadeIn();

      setTimeout(() => {
        $(".product-shipping .shipping__error")
          .fadeOut()
          .remove();
      }, 2000);

      return false;
    }

    _this.mountTable(html);
  },

  calculateShipping: function(cep) {
    var _this = this;

    var quantity = $(".product-item__qty-field").val();

    $.get(
      "/frete/calcula/" +
        skuJson.skus[0].sku +
        "?shippinCep=" +
        cep +
        "&quantity=" +
        quantity,
      function(response) {
        if (response) {
          _this.validatePostalCode(response);
        } else {
          $(".product-shipping").append(
            `<span class="product-shipping__error" style="color: tomato; display: none">Não é possível calcular o valor do Frete para o CEP informado.</span>`
          );
          $(".product-shipping__error").fadeIn();
          setTimeout(() => {
            $(".product-shipping .shipping__error")
              .fadeOut()
              .remove();
          }, 2000);
        }
      }
    );
  },

  selectFirstSKUs: function() {
    var _this = this,
      categoryName = vtxctx.categoryName;

    if (categoryName != "CARTÃO PRESENTE") {
      setTimeout(function() {
        if (!_this.hasSkuInQueryString()) {
          $(".input-dimension-Cor")[0].click();
          $(".dropdown-menu li a")[1].click();
        }

        var input = $(".input-dimension-Cor.checked");

        _this.setTamanhosPorCor(input.attr("data-value"));
      }, 2000);
    } else {
      $(".topic.Cor").css({ display: "none" });
      $(".topic.Tamanho").css({ display: "none" });
    }
  },

  duplicateProductName: function() {
    const $name = $(".productName");
    const title = this._removeSkuName($name.text().trim());
    const html = `<div class="product-name__title">${title}</div>`;

    $name.after(html);
  },

  _removeSkuName: function(name) {
    const { skus } = skuJson;
    const len = skus.length;
    const skuName = skus[0].skuname;

    if (len === 1) {
      return name.replace(` - ${skuName}`, "");
    }

    return name;
  },

  startSlickModelo: function() {
    $(".slick-modelos").slick({
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    });
  },

  getSkuById: function(id) {
    var response = {};

    this.skuList.forEach(function(sku) {
      if (sku.id === id) {
        response = sku;
      }
    });
    return response;
  },

  createDepoimentos: function() {
    var self = this,
      urlMasterData =
        "//api.vtexcrm.com.br/decathlonpro/dataentities/DC/search?_fields=content,image,id";

    $.ajax({
      url: urlMasterData,
      type: "get",
      headers: {
        Accept: "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json",
        "REST-Range": "resources=0-100"
      }
    }).then(
      function(data) {
        for (var i = 0; i < data.length; i++) {
          var infoItem = `<div class="depoimentos-item">
                                    <div class="depoimentos-img">
                                        <img src="http://api.vtex.com/decathlonpro/dataentities/DC/documents/${data[i].id}/image/attachments/${data[i].image}" alt="${data[i].title}">
                                    </div>
                                    <div class="depoimentos-info">
                                        <div>
                                            ${data[i].content}
                                        </div>
                                    </div>
                                </div>`;

          self.slickDepoimentos.append(infoItem);

          if (i == data.length - 1) {
            self.slickDepoimentos.slick({
              dots: true,
              arrows: true,
              autoplay: false,
              slidesToShow: 1,
              autoplaySpeed: 5000,
              prevArrow:
                '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"></button>',
              nextArrow:
                '<button class="slick-next slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"></button>'
            });
          }
        }
      },
      function(err) {
        console.log("Error on get itens:", err);
      }
    );
  },

  selectSkuByUrl: function() {
    let url = window.location.search,
      resultUrl = this.getQueryParams(url);

    if (resultUrl.aSku) {
      let split = resultUrl.aSku.split(":"),
        type = split[0],
        value = split[1].replace("-", " "),
        target = $(`.product-sku ul.${type}`);

      const _interval = setInterval(function() {
        if (target.length) {
          clearInterval(_interval);
          target.find(`input[data-value='${value}'] + label`).click();

          $(".product-sku .Cor .specification span").text(value);
        }
      }, 100);
    }
  },

  getQueryParams: function(qs) {
    qs = qs.split("?");
    qs = qs[qs.length - 1];

    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
    while ((tokens = re.exec(qs))) {
      if (params[decodeURIComponent(tokens[1])]) {
        params[decodeURIComponent(tokens[1])] +=
          "," + decodeURIComponent(tokens[2]);
      } else {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
    }
    return params;
  },

  eachSku: function() {
    var _self = this;

    if (_self.skuColor.length === 0) {
      return false;
    }

    var skuColorLabel = (_self.skuColor.find("label").length, []);

    $.each(skuJson.skus, function(index, element) {
      if (
        skuColorLabel.indexOf(element.values[0]) > -1 &&
        !skuColorLabel.push(element.values[0])
      ) {
        return true;
      }

      _self.skuList.push({
        id: element.sku,
        name: element.values[0],
        thumb: "",
        texture: ""
      });

      _self.setSkuImg(element.sku, element.values[0]);
    });
  },

  setSkuImg: function(skuId, skuName) {
    var _this = this;
    var url = "/produto/sku/" + skuId;

    $.getJSON(url, function(data) {
      try {
        var qtyImg = data[0].Images[0].length;

        if (typeof qtyImg != "undefined") {
          for (var i = 0; qtyImg > i; i++) {
            var j = 0;
            var archiveTypeId = data[0].Images[j][i].ArchiveTypeId;

            if (archiveTypeId == 1) {
              var path = data[0].Images[j][i].Path;

              $.each(_this.skuList, function(index, element) {
                element.id == skuId && (_this.skuList[index].thumb = path);
              });

              $(".Cor")
                .find("label")
                .each(function() {
                  // console.log(skuName, $(this).text())
                  if (skuName == $(this).text()) {
                    // console.log('log', $(this))
                    $(this).html(
                      '<img src="' +
                        path +
                        '" alt="' +
                        $(this).text() +
                        '" title="' +
                        $(this).text() +
                        '" />'
                    );
                  }
                });
            }
          }
        }
      } catch (m) {}
    });
  },

  skuCorSlick: function() {
    if ($(".quickbuy-product-info").length > 0) {
      if (
        $(".quickbuy-product-info .product-sku .item-dimension-Cor label")
          .length > 3
      ) {
        $(
          ".quickbuy-product-info .product-sku .item-dimension-Cor > span"
        ).slick({
          dots: false,
          arrows: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: false,
          infinite: false
        });
      }
    }
  },

  setMarca: function() {
    var marca = $(".product-brand .brandName a")
      .text()
      .toLowerCase()
      .replace(/\s/g, "-");
    $(".product-brand .brandName a").html(
      '<img src="/arquivos/marca-' + marca + '.png" alt="' + marca + '" />'
    );

    //var marcaModal = $('.modal-brand .brandName a').text().toLowerCase().replace(/\s/g, "-");
    $(".modal-brand .brandName a").html(
      '<img src="/arquivos/marca-' + marca + '.png" alt="' + marca + '" />'
    );
  },

  setReference: function(id) {
    const skuId = id;

    $.ajax({
      type: "get",
      url: `http://skubyid--decathlonstore.myvtex.com/_v/product/sku/${skuId}`,
      dataType: "json"
    }).then(
      response => {
        let refCode = response.data.ManufacturerCode;

        if (response.data == null || response.data == undefined) {
          return;
        }

        $(".product-reference__codigo-fabricante").text(refCode);
      },
      error => {
        throw new Error(error);
      }
    );
  },

  setPreco: function() {
    const $antes = $(".valor-de > span");

    if (!$antes.length) {
      $(".valor-de").prepend("<span>antes </span>");
    }

    var valorPor = $(".skuBestPrice")
      .text()
      .split(",");

    if (!$("body").hasClass("quickbuy")) {
      if (!$(".skuBestPrice small").length) {
        $(".skuBestPrice").html(
          valorPor[0] + "<small> " + valorPor[1] + "</small> "
        );
      }
    }

    if ($(".valor-de").length) {
      $(".valor-por .skuBestPrice").addClass("skuBestPrice-discount");
    }
  },

  setPrecoQuickbuy: function() {
    if ($(".quickbuy-product-info").length > 0) {
      if ($(".skuBestPrice").length > 0) {
        if ($(".valor-de").length) {
          $(".valor-por .skuBestPrice").addClass("skuBestPrice-discount");
        }

        var priceText = $(".quickbuy-product-info .skuBestPrice").text(),
          price = priceText.split(" ")[1],
          priceWhole = price.split(",")[0],
          priceDecimal = price.split(",")[1];

        $(".quickbuy-product-info .skuBestPrice").html(
          '<span class="cifrao">R$</span> <span class="price">' +
            priceWhole +
            '</span><span class="decimal">,' +
            priceDecimal +
            "</span>"
        );
      }
    }
  },

  skuDOM: function() {
    $(".product-sku .Tamanho").before($(".product-sku .Cor"));
    var guiaTamanhos = $(
      '<a href="/guia-de-tamanhos" class="product-size__link" target="_blank">Guia de tamanhos</a>'
    );
    guiaTamanhos.appendTo($(".product-sku .Tamanho"));
  },

  setTamanho: function() {
    $(".item-dimension-Tamanho select").selectpicker({
      //size: 2
    });
  },

  setValor: function() {
    $(".item-dimension-Valor select").selectpicker({
      //size: 2
    });

    $(".item-dimension-Valor .filter-option").text("Selecione o Valor");

    // Formatação do valor no dropdown
    var qtdValoresCPDropdown = $(
      ".item-dimension-Valor .sku-selector .dropdown-menu ul li a"
    ).length;
    for (var i = 0; i < qtdValoresCPDropdown; i++) {
      var categoryName = vtxctx.categoryName;

      var valorCPD = $(
        ".item-dimension-Valor .sku-selector .dropdown-menu ul li a.skuopcao_" +
          i
      );
      var valorFinalCPD = valorCPD.text();
      if (categoryName == "CARTÃO PRESENTE") {
        var valorFinalCPD = valorFinalCPD;
      } else {
        var valorFinalCPD = "R$ " + valorFinalCPD + ",00";
      }
      valorCPD.text(valorFinalCPD);
    }

    // Formatação do valor no option
    var qtdValoresCPOption = $(
      ".item-dimension-Valor .sku-selector select option"
    ).length;
    for (var i = 0; i < qtdValoresCPOption; i++) {
      var valorCPO = $(
        ".item-dimension-Valor .sku-selector .dropdown-menu ul li a.skuopcao_" +
          i
      );
      var valorFinalCPO = valorCPO.text();
      var valorFinalCPO = "R$ " + valorFinalCPO + ",00";
      valorCPO.text(valorFinalCPO);
    }
  },

  buyButtonText: function() {
    this.buyButton.text("Adicionar ao carrinho");
  },

  datailsImagesDom: function() {
    $(".product-images .thumbs").appendTo(".details-content__item--images");
    $(".details-content__item--images .thumbs a img").each(function() {
      var imgSrc = $(this).attr("src");

      $(this).attr("src", imgSrc.replace("-80-80", "-204-204"));
    });

    $(".details-content__item--images .thumbs").slick({
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      infinite: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true
          }
        }
      ]
    });

    $(".dropdown-menu.inner > li")
      .find(">a")
      .on("click", function() {
        $(".details-content__item--images .thumbs").slick("unslick");

        var intervalSlick = setInterval(function() {
          if ($(".details-content__item--images .thumbs > li").length > 0) {
            $(".details-content__item--images .thumbs a img").each(function() {
              var imgSrc = $(this).attr("src");
              $(this).attr("src", imgSrc.replace("-80-80", "-204-204"));
            });
            $(".details-content__item--images .thumbs").slick({
              dots: false,
              slidesToShow: 5,
              slidesToScroll: 2,
              infinite: true,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                  }
                }
              ]
            });

            clearInterval(intervalSlick);
          }
        }, 100);
      });
  },

  datailsBeneficiosDom: function() {
    var beneficioItem = $(".value-field.beneficiosDoProduto").find(
        ".benefit-item"
      ),
      itemIndex = 1,
      beneficiosCols = $(
        '<div class="benefits-col"></div><div class="benefits-col"></div>'
      );

    beneficiosCols.appendTo(".details-content__item--benefits");

    beneficioItem.each(function() {
      var html = $(this);

      if (itemIndex % 2) {
        html.appendTo($(".benefits-col")[0]);
      } else {
        html.appendTo($(".benefits-col")[1]);
      }

      itemIndex++;
    });
  },

  datailsInformacoesDom: function() {
    var informacoesItem = $(".value-field.informacoesTecnicas").find(
        ".technical-item"
      ),
      informacoesItemCount = informacoesItem.length,
      verMais = $(
        '<div class="technical-ver-mais"><a href="">Ver mais</a></div>'
      );

    informacoesItem.each(function() {
      var html = $(this);

      html.appendTo(".details-content__item--technical");
    });

    if (informacoesItemCount > 4) {
      var maxAltura = 0;

      for (var i = 0; i < informacoesItemCount; i++) {
        var altura = informacoesItem[i].offsetHeight;
        maxAltura += altura;

        if (i === 3) break;
      }

      verMais.appendTo(".details-content__item--technical");

      maxAltura += verMais.outerHeight();

      $(".details-content__item--technical").height(maxAltura);
    }
  },

  datailsConceitoDom: function() {
    var conceitoItem = $(".value-field.conceitoTecnologia").find(
        ".concept-item"
      ),
      itemIndex = 1,
      conceitoCols = $(
        '<div class="conceitos-col"></div><div class="conceitos-col"></div>'
      );

    conceitoCols.appendTo(".details-content__item--concept");

    conceitoItem.each(function() {
      var html = $(this);

      if (itemIndex % 2) {
        html.appendTo($(".conceitos-col")[0]);
      } else {
        html.appendTo($(".conceitos-col")[1]);
      }

      itemIndex++;
    });

    var cols = $(".conceitos-col"),
      alturas = [];

    if ($(window).width() > 992) {
      for (var i = 0; i < cols.length; i++) {
        var altura = cols[i].offsetHeight;
        alturas.push(altura);
      }

      var maiorAltura = Math.max.apply(null, alturas);

      $(".conceitos-col").height(maiorAltura);
    }
  },

  AvantiOnSkuSelectionChanged: function(e) {
    console.log("AvantiOnSkuSelectionChanged", e);
    APP.i.currentController.currentSku = e.newSkuId;
    APP.i.currentController.currentSkuAvailable = false;
    APP.i.currentController.currentSkuAvailableQuantity = 0;

    // Informações do sku ativo
    for (i = 0; i < skuJson.skus.length; i++) {
      if (skuJson.skus[i].sku == APP.i.currentController.currentSku) {
        APP.i.currentController.currentSkuAvailable = skuJson.skus[i].available;
        APP.i.currentController.currentSkuAvailableQuantity =
          skuJson.skus[i].availablequantity;
      }
    }

    APP.i.currentController.notifyMeDom();
    APP.i.currentController.setReference(APP.i.currentController.currentSku);
    setTimeout(function() {
      APP.i.currentController.setPreco();
    }, 300);
  },

  notifymeAllUnavailable: function() {
    if (!skuJson.available) {
      var cores = $(".item-dimension-Cor label");

      const _interval = setInterval(function() {
        if (cores.length) {
          clearInterval(_interval);
          cores[0].click();
        }
      }, 100);
    }
  },

  notifyMeDom: function() {
    if (!APP.i.currentController.currentSkuAvailableQuantity) {
      $(".product-item-quantity__control").addClass("hide");
      $(".product-buy").addClass("notify-me-block");
      $(".sku-notifyme-button-ok.notifyme-button-ok").attr(
        "value",
        "Avise-me quando chegar"
      );
    } else {
      $(".product-item-quantity__control").removeClass("hide");
      $(".product-buy").removeClass("notify-me-block");
    }
  },

  notifyMeDomUnique: function() {
    if (skuJson.skus.length == 1) {
      if (!skuJson.available) {
        $(".product-item-quantity__control").addClass("hide");
        $(".product-buy").addClass("notify-me-block");
      } else {
        $(".product-item-quantity__control").removeClass("hide");
        $(".product-buy").removeClass("notify-me-block");
      }
    }
  },

  /*notifyme: function() { //preencher o nome automaticamente
        let button = $('#notifymeButtonOK'),
            inputName = $('#notifymeClientName');

        const changeBtn = setInterval(function() {
            if (button.length) {
                inputName.val('Cliente interessado'),
                    clearInterval(changeBtn);
            }
        }, 200);
    },*/

  mobileDom: function() {
    if ($(window).width() <= 768) {
      $(".product-name").after($(".product-reference"));
    }
  },

  skuTamanhoUnico: function() {
    // Hide tamanho select quando a opção é UNICO
    if (skuJson.dimensionsMap.Tamanho != null) {
      if (skuJson.dimensionsMap.Tamanho.length == 1) {
        if (
          skuJson.dimensionsMap.Tamanho[0] == "UNICO" ||
          skuJson.dimensionsMap.Tamanho[0] == "ÚNICO"
        ) {
          var tamanhoUnico = $(
            '<li><span class="tamanho-unico">Tamanho único</span</li>'
          );
          $(".product-sku .Tamanho .item-dimension-Tamanho").hide();
          tamanhoUnico.appendTo($(".product-sku .Tamanho"));
        } else {
          // $('.product-sku .Tamanho').hide();
        }
      }
    }
  },

  updateDimenstionsBySku: function(sku) {
    var cor = sku;
  },

  skuValorUnico: function() {
    // Hide valor select quando a opção é UNICO
    if (skuJson.dimensionsMap.Valor != null) {
      if (skuJson.dimensionsMap.Valor.length == 1) {
        if (
          skuJson.dimensionsMap.Valor[0] == "UNICO" ||
          skuJson.dimensionsMap.Valor[0] == "ÚNICO"
        ) {
          var valorUnico = $(
            '<li><span class="valor-unico">Valor único</span</li>'
          );
          $(".product-sku .Valor .item-dimension-Valor").hide();
          valorUnico.appendTo($(".product-sku .Valor"));
        } else {
          $(".product-sku .Valor").hide();
        }
      }
    }
  },

  slickThumbsModal: function() {
    if (!$(".av-modal--product-images .thumbs.slick-initialized").length) {
      $(".av-modal--product-images .thumbs").slick({
        dots: false,
        arrows: true,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 6
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },
          {
            breakpoint: 481,
            settings: {
              arrows: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              centerMode: true,
              vertical: false,
              verticalSwiping: false,
              centerMode: false
            }
          }
        ]
      });
    }
  },

  startSlickProducts: function() {
    $(".product-shelf .shelf-default .prateleira > ul").slick({
      dots: true,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });
  },

  hasSkuInQueryString: function() {
    var string = location.href.split("aSku=")[1];

    return string;
  },

  setTamanhosPorCor: function(cor) {
    const $buttonSelect = $(".skuList.item-dimension-Tamanho button");
    const $skuSelector = $("select.sku-selector");

    $(".skuList ul li").show();

    var skus = skuJson.skus.filter(function(sku) {
      return sku.dimensions.Cor == cor;
    });

    var tamanhos = skus.map(function(sku) {
      return sku.dimensions.Tamanho;
    });

    $("select.sku-selector option").map(function(key) {
      var _this = $(this);

      if ($.inArray(_this.val(), tamanhos) == -1) {
        $(".skuList ul li[data-original-index=" + key + "]").hide();
      }
    });

    console.log();

    $(".skuList ul.dropdown-menu li").each(function(key) {
      if ($(this).css("display") != "none") {
        $(this)
          .find("a")
          .click();
        $buttonSelect.addClass("bs-placeholder");
        $buttonSelect.prop("title", "Nothing selected");
        $buttonSelect.find("span.filter-option").html("Selecione");

        setTimeout(function() {
          $skuSelector
            .find("option.checked")
            .removeClass("selected")
            .prop("selected", false);
        }, 400);

        return false;
      }
    });
  },

  bind: function() {
    var _this = this;

    // Adiciona listener no evento skuSelectionChanged
    var AvantiskuDataFetcherListener = new Vtex.JSEvents.Listener(
      "skuDataFetcher",
      _this.AvantiOnSkuSelectionChanged
    );
    skuEventDispatcher.addListener(
      skuSelectionChangedEventName,
      AvantiskuDataFetcherListener
    );

    $(".product-buy-info").on("change", ".skuList input", event => {
      setTimeout(() => {
        this.setPreco();
      }, 300);
    });

    $(".product-item-quantity__control").on(
      "click",
      ".product-item__qty-plus",
      function() {
        var parent = $(this).parent();
        parent.find("input").val(parseInt(parent.find("input").val()) + 1);
      }
    );

    $(".product-item-quantity__control").on(
      "click",
      ".product-item__qty-minus",
      function() {
        var parent = $(this).parent();
        if (parent.find("input").val() >= 2) {
          parent.find("input").val(parseInt(parent.find("input").val()) - 1);
        }
      }
    );

    $(".item-dimension-Cor").on("click", "label", function() {
      var corName = $(this)
          .find("img")
          .attr("title"),
        corSpan = $("<span>" + corName + "</span>");

      $(".product-sku .Cor .specification").text("Cor:");

      if ($(".product-sku .Cor .specification span").length > 0) {
        $(".product-sku .Cor .specification span").text(corName);
      } else {
        $(".product-sku .Cor .specification").append(corSpan);
      }

      $(".details-content__item--images .thumbs").slick("unslick");

      var intervalSlick = setInterval(function() {
        if ($(".details-content__item--images .thumbs > li").length > 0) {
          $(".details-content__item--images .thumbs a img").each(function() {
            var imgSrc = $(this).attr("src");
            $(this).attr("src", imgSrc.replace("-80-80", "-204-204"));
          });
          $(".details-content__item--images .thumbs").slick({
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            infinite: true,
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  centerMode: true
                }
              }
            ]
          });

          clearInterval(intervalSlick);
        }
      }, 300);

      var intervalPrice = setInterval(function() {
        if ($(".skuBestPrice span").length < 1) {
          _this.setPrecoQuickbuy();
          _this.setTamanhosPorCor(corName);
          clearInterval(intervalPrice);
        }
      }, 300);

      $(".item-dimension-Tamanho ul li:first-child a").click();

      if (
        $(".item-dimension-Tamanho .filter-option").text() == "Nothing selected"
      ) {
        $(".item-dimension-Tamanho .filter-option").text("Selecione");
      }
    });

    if (
      $(".item-dimension-Tamanho .filter-option").text() == "Nothing selected"
    ) {
      $(".item-dimension-Tamanho .filter-option").text("Selecione");
    }

    $(".item-dimension-Tamanho .filter-option").on(
      "DOMSubtreeModified",
      function() {
        var intervalPrice = setInterval(function() {
          if ($(".skuBestPrice span").length < 1) {
            _this.setPrecoQuickbuy();
            clearInterval(intervalPrice);
          }
        }, 100);
      }
    );

    $(".item-dimension-Valor .filter-option").on(
      "DOMSubtreeModified",
      function() {
        var intervalPrice = setInterval(function() {
          if ($(".skuBestPrice span").length < 1) {
            _this.setPrecoQuickbuy();
            clearInterval(intervalPrice);
          }
        }, 100);

        if ($(".sifrao-cartao").length < 1) {
          $(".item-dimension-Valor .sku-selector button").prepend(
            '<span class="sifrao-cartao">R$ </span>'
          );
          $(".item-dimension-Valor .sku-selector button").append(
            '<span class="decimal-cartao">,00</span>'
          );
          $(".filter-option")
            .removeClass("pull-left")
            .css({ overflow: "unset", width: "auto" });
        }
      }
    );

    $(document).on("click", 'a[href^="#"]', function(e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top - 120
        },
        500
      );
    });

    this.buyButton.click(function(e) {
      e.preventDefault();

      const $buttonSelect = $(".skuList.item-dimension-Tamanho button");
      var hrefBuyButton = $(this).attr("href");

      if (
        $("ul.Tamanho:visible").length > 0 &&
        $("ul.Tamanho li span.tamanho-unico").length === 0 &&
        $buttonSelect.prop("title") === "Nothing selected"
      ) {
        alert("Selecione o tamanho.");

        return false;
      }

      if (hrefBuyButton.indexOf("/checkout") === -1) {
        return false;
      }
      e.preventDefault();

      var finalUrl = "",
        sku = hrefBuyButton.split("=")[1].replace("&qty", ""),
        qty = parseInt($(".product-item__qty-field").val()),
        url = hrefBuyButton;

      var item = APP.i.minicart.itemExists(sku);
      if (item.length) {
        var qty = parseInt(item[0].quantity) + qty;
      }

      var urlArr = url.split("&"),
        newQty = "qty=" + qty;
      urlArr.splice(1, 1, newQty);

      for (var i = 0; i < urlArr.length; ++i) {
        finalUrl += urlArr[i] + "&";
      }

      if ($("body").hasClass("quickbuy")) {
        $(".av-modal--quick-buy", window.parent.document).hide();
        $("body", window.parent.document).removeClass("scroll-lock");
        window.parent.APP.i.minicart.addCart(
          finalUrl,
          skuJson.productId,
          function() {}
        );
        $(".header-item-minicart, .minicart", window.parent.document).addClass(
          "hovered"
        );
      } else {
        APP.i.minicart.addCart(finalUrl, skuJson.productId, function() {});
        $(".header-item-minicart, .minicart", window.parent.document).addClass(
          "hovered"
        );
      }

      /* setTimeout(function(){
              APP.i.util.verifyLogin(function(loggedIn) {
                  if (loggedIn) {
                      if (APP.i.accessControl.userPermission == "Aprovado") {
                          var finalUrl = '',
                              sku = hrefBuyButton.split('=')[1].replace('&qty', ''),
                              qty = parseInt($('.product-item__qty-field').val()),
                              url = hrefBuyButton;
  
                          var item = APP.i.minicart.itemExists(sku);
                          if (item.length) {
                              var qty = parseInt(item[0].quantity) + qty;
  
                          }
  
                          var urlArr = url.split('&'),
                              newQty = 'qty=' + qty;
                          urlArr.splice(1, 1, newQty);
  
                          for (var i = 0; i < urlArr.length; ++i) {
                              finalUrl += urlArr[i] + '&';
                          }
  
                          if($('body').hasClass('quickbuy')) {
                              $('.av-modal--quick-buy', window.parent.document).hide()
                              $('body', window.parent.document).removeClass('scroll-lock')
                              window.parent.APP.i.minicart.addCart(finalUrl, skuJson.productId, function() {})
                              $('.header-item-minicart, .minicart', window.parent.document).addClass('hovered')
                          }else{
                              APP.i.minicart.addCart(finalUrl, skuJson.productId, function() {})
                              $('.header-item-minicart, .minicart', window.parent.document).addClass('hovered')
  
                          }
  
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
          }, 100) */
    });

    var totalSlides = $(".av-modal--product-images .thumbs li").length,
      counter = $(
        '<div class="slide-counter"><span class="slide-counter__current">1</span>/' +
          totalSlides +
          "</div>"
      ),
      mainImage = $(".modal-images #include");

    counter.appendTo(mainImage);

    $(".product-more-images").on("click", function() {
      setTimeout(function() {
        _this.slickThumbsModal();
      }, 1000);
    });

    $(".av-modal--product-images").on(
      "click",
      ".slick-next, .slick-prev",
      function() {
        $(".av-modal--product-images .slick-current a").trigger("click");

        var slideIndex =
          parseInt(
            $(".av-modal--product-images .slick-current").attr(
              "data-slick-index"
            )
          ) + 1;
        $(".av-modal--product-images .slide-counter__current").text(slideIndex);
      }
    );

    $(".av-modal--product-images").on("click", ".slick-slide", function() {
      var slideIndex = parseInt($(this).attr("data-slick-index")) + 1;
      $(".av-modal--product-images .slide-counter__current").text(slideIndex);
    });

    if ($(".valor-de").length) {
      $(".valor-por .skuBestPrice").addClass("skuBestPrice-discount");
    }

    if ($(".technical-ver-mais").length) {
      $(".technical-ver-mais > a").on("click", function(e) {
        e.preventDefault();
        $(".technical-ver-mais").hide();
        $(".details-content__item--technical").height("auto");
      });
    }

    $(".product-shipping .product-shipping__form-input").on("keyup", function(
      e
    ) {
      var value = $(".product-shipping .product-shipping__form-input").val();

      var mask = "#####-###";

      var size = value.length;

      var end = mask.substring(1, 0);
      var text = mask.substring(size);

      if (text.substring(0, 1) != end) {
        value += text.substring(0, 1);
      }

      $(".product-shipping .product-shipping__form-input").val(value);
    });

    $(".product-shipping .product-shipping__form-button").on("click", function(
      e
    ) {
      e.preventDefault();

      var cep = $(".product-shipping .product-shipping__form-input")
        .val()
        .split("-")
        .join("");

      _this.calculateShipping(cep);
    });

    $(".product-item__qty-plus, .product-item__qty-minus").on(
      "click",
      function() {
        if ($(".product-shipping .freight-values").length) {
          var cep = $(".product-shipping .product-shipping__form-input")
            .val()
            .split("-")
            .join("");

          _this.calculateShipping(cep);
        }
      }
    );
  }
});
