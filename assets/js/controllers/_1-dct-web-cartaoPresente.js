APP.controller.cartaoPresente = ClassAvanti.extend({
    init: function() {
        this.setup();
        this.start();
        this.bind();
    },

    setup: function() {
        this.slickDepoimentos = $('.slick-depoimentos'); 
    },

    start: function() {
        this.createDepoimentos();    
    },

    createDepoimentos: function () {
        var self = this,
            urlMasterData = '//api.vtexcrm.com.br/decathlonpro/dataentities/DC/search?_fields=content,image,id';

        $.ajax({
            url: urlMasterData,
            type: 'get',
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
                'REST-Range': 'resources=0-100'
            }
        }).then(function (data) {
            for( var i = 0; i < data.length; i++) {
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

                if( i == data.length - 1) {
                    self.slickDepoimentos.slick({
                        dots: true,
                        arrows: true,
                        autoplay: false,
                        slidesToShow: 1,
                        autoplaySpeed: 5000,
                        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"></button>',
                        nextArrow: '<button class="slick-next slick-arrow" aria-label="Previous" type="button" style="display: inline-block;"></button>'
                    });
                }
            }

        }, function (err) {
            console.log('Error on get itens:', err);
        });


    },

    bind: function() {
    }
});
