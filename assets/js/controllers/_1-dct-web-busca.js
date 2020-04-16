APP.controller.Busca = ClassAvanti.extend({
	init: function () {
		this.setup();
		this.start();
		this.bind();
	},
	setup: function () {
		this.resultQuantity = $('.resultado-busca-numero span').eq(1);
		this.resultQuantityText = $('.listagem-title');
	},

	start: function () {
		APP.i.Listagem = new APP.component.Listagem();
			this.setResultQuantity();
			this.startSidebarFilter();
	},

	setResultQuantity: function () {

	},

	startSidebarFilter: function () {
        var _this = this;

        new APP.component.SidebarFilter({
            cleanSingleFilterName: true,
            cleanMultipleFilterName: true,
            createBrandsList: false,
            closeAllFiltersAndOpenFirst: false
        });

        _this.multipleMenu.find('fieldset').each(function() {
            var title = $(this).find('h5').text();

            var slug = APP.i.util.removeAccentuation(title);
            slug = slug.toLowerCase();
            slug = slug.replace(' ', '-');

            $(this).addClass('filter--' + slug );
        });

        _this.multipleMenuDesk.find('fieldset').each(function() {
            $(this).find('> div').enscroll({
                scrollIncrement: 5
            });

            if ($(this).find('> div').next('div').is(':visible')) {
                $(this).addClass('filter-scroll-active');
            }
        });

        new APP.component.SidebarFilterPrice();
    },

	bind: function(){

	}
});