APP.controller.Informativo = ClassAvanti.extend({
    /*init: function () {
        this.setup();
        this.start();
        this.bind();
    },

    setup: function () {
        this.container = $('.informativo-content .wrapper')

    },

    start: function () {
        this.getInformativeItens();
    },

    getInformativeItens: function (callback) {
        var self = this,
            urlMasterData = '//api.vtexcrm.com.br/decathlonpro/dataentities/DI/search?_fields=title,summary,content,image,id,urlPdf';

        $.ajax({
            url: urlMasterData,
            type: 'get',
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
                'REST-Range': 'resources=0-100'
            }
        }).then(function (data) {
            for( let i = 0; i < data.length; i++) {
                let infoItem = `<div class="informative-item">
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

                self.container.append(infoItem);
            }

        }, function (err) {
            console.log('Error on get itens:', err);
        });
    },


  bind: function () {
    var _this = this;
  }*/
});
