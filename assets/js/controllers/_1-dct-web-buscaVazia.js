APP.controller.BuscaVazia = ClassAvanti.extend({
  	init: function () {
        this.setup();
        this.start();
        this.bind();
    },

    setup: function () {
        //
    },

    start: function () {
        this.getSearchTerm();
    },

    getSearchTerm: function () {
        const self = this;

        const queryString = window.location.search.substr(1);
        const params = queryString.split('&');

        const term = params.reduce((current, item) => {
            const [key, value] = item.split('=');
            let string = '';
            if (key === 'ft') {
                string = value;
            }

            return current.concat(string)
        }, '');

        $('.listagem-title h2 strong').text(decodeURIComponent(term));
    },

    bind: function () {
        //
    },
});
