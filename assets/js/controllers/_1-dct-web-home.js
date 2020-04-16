APP.controller.Home = ClassAvanti.extend({
  init: function () {
    this.setup();
    this.start();
    this.bind();
  },

  setup: function () {
    this.slickTopBanner = $('.home-top-banner .slick-banner-full');
    this.slickTopBannerMobile = $('.home-top-banner__mobile .slick-banner-full');
    this.slickVitrine = $('.home-products-1 .prateleira > ul');
    this.slickVitrine2 = $('.home-products-2 .prateleira > ul');
    this.slickInformativo = $('.slick-informative');
    this.form = $('#formCnpj');
    this.formCnpj = this.form.find('#cnpj');
  },

  start: function () {
    this.startSlicks();
    this.createInformative();
    this.setMasks();
    this.getSportsCarousel();
  },

  startSlicks: function () {
    this.slickTopBanner.slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000
    });

    this.slickTopBannerMobile.slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [{
        breakpoint: 768,
        settings: {
          autoplay: true,
        }
      }, ]
    });

    if ($(window).width() < 992) {
      this.slickVitrine.slick({
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        arrows: false,
        responsive: [{
          breakpoint: 468,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          },
        }, ]

      });
    }

    this.slickVitrine2.slick({
      autoplay: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      infinite: true,
      arrows: true,
      prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"><i class="icon icon-arrow-black-vitrine"></i></button>',
      nextArrow: '<button class="slick-next slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"><i class="icon icon-arrow-black-vitrine"></i></button>',
      responsive: [{
          breakpoint: 992,
          settings: {
            arrows: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          },
        }
      ]
    });
  },

  createInformative: function () {
    var _this = this, urlMasterData = '//api.vtexcrm.com.br/decathlonpro/dataentities/DI/search?_fields=title,summary,content,image,id,urlPdf';

    $.ajax({
      url: urlMasterData,
      type: 'get',
      headers: {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'REST-Range': 'resources=0-100'
      }
    }).then(function (data) {
      for (let i = 0; i < data.length; i++) {
        let infoItem = `
			<div class="informative-item">
				<div class="informative-img">
						<img src="http://api.vtex.com/decathlonpro/dataentities/DI/documents/${data[i].id}/image/attachments/${data[i].image}" alt="${data[i].title}">
				</div>
				<div class="informative-info">
						<h3>${data[i].title}</h3>
						<div>
								${data[i].summary}
						</div>

						<a href="${data[i].urlPdf}" target="_blank" class="button button--blue button--medium button--shadow">Saiba mais <i class="icon icon-arrow-white"></i></a>
				</div>
			</div>`;

        _this.slickInformativo.append(infoItem);

        if (i == data.length - 1) {
          _this.slickInformativo.slick({
            dots: false,
            arrows: true,
            autoplay: false,
            slidesToShow: 1,
            autoplaySpeed: 5000,
            prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"><i class="icon icon-arrow-black"></i></button>',
            nextArrow: '<button class="slick-next slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"><i class="icon icon-arrow-black"></i></button>'
          });
        }
      }

    }, function (err) {
      console.log('Error on get itens:', err);
    });
  },

  setMasks: function () {
    this.formCnpj.mask('00.000.000/0000-00');
  },

  setCookie: function () {
    var _this = this, cnpj = '';
    cnpj = $("#cnpj").val();
    Cookies.set('cnpjCadastro', cnpj)
  },

  getSportsCarousel: function () {
    let _this = this, endpoint = '//api.vtexcrm.com.br/decathlonpro/dataentities/EH/search?_fields=label,linkDpt,imgPicto';

    $.ajax({
      url: endpoint,
      type: 'GET',
      headers: {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'REST-Range': 'resources=0-100'
      }
    }).then(function (data) {
      if (!data) return;

      let items = data.sort(function (a, b) {
        if (a.label > b.label) return 1;
        if (a.label < b.label) return -1;
        return 0;
      });

      _this.setSportsCarousel(items);

    }, function (err) {
      console.log('Error on get itens:', err);
    });
  },
  setSportsCarousel: function (items) {
    for (let i = 0; i < items.length; i++) {
      let item = `
				<div class="sports-carousel__item">
						<a href="${items[i].linkDpt}">
								<img class="sports-carousel__item-img" src="/arquivos/${items[i].imgPicto}" alt="${items[i].label}" />
								<h2 class="sports-carousel__item-title">${items[i].label}</h2>
						</a>
				</div>`;

      $('.sports-carousel__items').append(item);
    }

    this.sportsCarouselSlick();
  },
  sportsCarouselSlick: function () {
    $(".sports-carousel__items").slick({
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      slidesToShow: 9,
      centerMode: true,
      prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: block;"><i class="icon icon-arrow-black-vitrine"></i></button>',
      nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: block;"><i class="icon icon-arrow-black-vitrine"></i></button>',
      responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3
          }
        }
      ]
	});
	
	//$(".sports-carousel").fadeIn();
  },
  sportsCarouselSearch: function () {
    let _this = this;

    if ($(".sports-carousel__search input").val().length > 2) {

      setTimeout(() => {
        let input = _this.rewrite($(".sports-carousel__search input").val());

        $(".sports-carousel__item").addClass("opacity-hide");

        $(".sports-carousel__item-title").each(function (item, index) {
		      let itemCarousel = $(this).parents(".sports-carousel__item");
		  
          if (!itemCarousel.hasClass("slick-cloned")) {
            let title = _this.rewrite($(this).text())

            if (title.indexOf(input) != -1) {
			        itemCarousel.addClass("opacity-show");
              $(".sports-carousel__items").slick("slickGoTo", itemCarousel.attr("data-slick-index"));
            }
          }
        });
      }, 1000);

    } else {
      $(".sports-carousel__items").slick('slickGoTo', 0);
      $(".sports-carousel__item").removeClass("opacity-hide");
      $(".sports-carousel__item").removeClass("opacity-show");
    }
  },
  rewrite: function (str) {
    if (!str) return;
    return str.toLowerCase()
      .replace(/[áàãâä]/g, "a")
      .replace(/[éèẽêë]/g, "e")
      .replace(/[íìĩîï]/g, "i")
      .replace(/[óòõôö]/g, "o")
      .replace(/[úùũûü]/g, "u")
      .replace(/ç/g, "c")
      .replace(/(\ |_)+/, " ")
      .replace(/(^-+|-+$)/, " ")
      .replace(/[^a-z0-9]+/g, " ");
  },

  bind: function () {
    var _this = this;

    $('#formCnpj .button').on('click', function () {
      _this.setCookie();
      if (document.cookie.indexOf('cnpjCadastro') !== '') {
        window.location.href = "/cadastro";
      }
    });

    $(".sports-carousel__search input").on("keyup", function () {
      _this.sportsCarouselSearch();
    });

    $('.sports-carousel__search form').on('submit', function (e) {
      e.preventDefault();
      _this.sportsCarouselSearch();
    });
  }
});
