APP.controller.Institucional = ClassAvanti.extend({
  init: function() {
    this.setup()
    this.start()
    this.bind()
  },

  setup: function() {
    APP.i.DropMenu = new APP.component.DropMenu()
    this.slickTopBanner = $('.home-top-banner .slick-banner-full')
    this.slickTopBannerMobile = $('.home-top-banner__mobile .slick-banner-full')
  },

  start: function() {
    this.startSlicks()
    this.startVideosSlick()

    if ($(document).width() <= 768) {
      $('.tab-pane').addClass('active')
    }

    // $('.home-top-banner .box-banner').hide();
    // $('.home-top-banner .slick-banner-full .box-banner').show();
  },

  getQuestionsAndAnswers: function() {
    const questionsAndAnswers = []
    if ($('.faq-list') && $('.faq-list').children()) {
      $('.faq-list__item').each(function() {
        let newObj = {
          index: '',
          title: '',
          content: '',
        }
        newObj.index = $(this).index()
        newObj.title = $(this)
          .find('.title')
          .text()
        newObj.content = $(this)
          .find('.content')
          .text()
        questionsAndAnswers.push(newObj)
      })
    }
    return questionsAndAnswers
  },

  startSlicks: function() {
    this.slickTopBanner.slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
    })

    this.slickTopBannerMobile.slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            autoplay: true,
          },
        },
      ],
    })
  },

  startVideosSlick: function() {
    for (var i = 0; i < 5; i++) {
      $('.thumbs-quem-somos_' + i).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slide-quem-somos_' + i,
        dots: false,
        arrows: true,
        focusOnSelect: true,
      })

      $('.slide-quem-somos_' + i).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.thumbs-quem-somos_' + i,
      })
    }
  },

  bind: function() {
    let questionsAndAnswers = this.getQuestionsAndAnswers()

    if (typeof lunr !== 'undefined') {
      var idx = lunr(function() {
        this.ref('index')
        this.field('title')
        this.field('content')
        questionsAndAnswers.forEach(questionAndAnswer => {
          this.add(questionAndAnswer)
        }, this)
      })
    }

    $('.home-top-banner .box-banner > a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash)

          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault()
            $('html, body').animate(
              {
                scrollTop: target.offset().top - 65,
              },
              1000,
              function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target)
                $target.focus()
                if ($target.is(':focus')) {
                  // Checking if the target was focused
                  return false
                } else {
                  $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                  $target.focus() // Set focus again
                }
              }
            )
          }
        }
      })

    $('.faq-list__item h4').click( function() {
      let listItem = $()
      $(this).hasClass('arrow') ? (listItem = $(this).parent()) : (listItem = this)
      if (
        $(listItem)
          .next('p')
          .is(':visible')
      ) {
        $(listItem)
        .next('p')
        .hide()
        $(listItem)
        .find('.arrow')
        .removeClass('active')
        $(listItem).removeClass('active')
        $(listItem).css('background', '#fff')
      } else {
        $(listItem)
          .next('p')
          .show()
        $(listItem)
          .find('.arrow')
          .addClass('active')
        $(listItem).addClass('active')
        $(listItem).css('background', '#fafafa')
      }
    })

    $('.faq-form').submit(e => {
      e.preventDefault()
      let inputText = $('.faq-form__search')[0].value
      $('.faq-subtitle').html(
        `Veja abaixo as perguntas mais frequentes da Decathlon PRO para <b style="text-transform:uppercase;">${
          inputText != '' ? inputText : 'busca vazia'
        }</b>:`
      )
      var questionsAndAnswersFiltered = idx.search(inputText)
      questionsAndAnswers.forEach(function(questionAndAnswer) {
        let staticListItemFound = 0
        for (let i = 0; i < questionsAndAnswersFiltered.length; i++) {
          if (questionAndAnswer.index == questionsAndAnswersFiltered[i].ref) {
            staticListItemFound = 1
            break
          }
        }
        staticListItemFound
          ? $($('.faq-list__item')[questionAndAnswer.index]).show()
          : $('.faq-list__item')[questionAndAnswer.index]
          ? $($('.faq-list__item')[questionAndAnswer.index]).hide()
          : false
      })
    })
  },
})
