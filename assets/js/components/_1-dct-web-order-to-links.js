APP.component.OrderToLinks = ClassAvanti.extend({
	init: function () {
		const self = this;

		this.setup();
		this.start();
		this.bind();
	},

	setup: function () {
		const self = this;

		self.$target = $('.resultado-busca-filtro');
		self.orders = {
			OrderByReleaseDateDESC: 'Mais recentes',
			OrderByTopSaleDESC: 'Mais vendidos',
			OrderByPriceASC: 'Menor preço'
		};

		self.classLink = 'order-links__link';
		self.classLinkActive = 'order-links__link--active';
	},

	start: function () {
		const self = this;

		self.createLinks();
		self.removeOptionsOrder();
	},

	createLinks: function () {
		const self = this;

		const $orders = $('<div class="order-links" />');

		for (const key in self.orders) {
			const value = self.orders[key];

			let linkClass = self.classLink;

			if (key === 'OrderByReleaseDateDESC') {
				linkClass += ` ${self.classLinkActive}`;
			}

			const $order = $('<a />',{
				class: linkClass
			})
				.attr('href', '#')
				.attr('order', key)
				.text(value);

			$orders.append($order);
		}

		self.$target.prepend($orders);
	},

	removeOptionsOrder: function () {
		const self = this;

		$('#O option').each((i, e) => {
			const _this = $(e);

			const value = _this.val();

			if (typeof self.orders[value] === 'undefined' && value !== '') {
				_this.remove();
			}
		});
	},

	bind: function () {
		const self = this;

		self.bindClickLink();
	},

	bindClickLink: function () {
		const self = this;

		$(`.${self.classLink}`).on('click', (event) => {
			event.preventDefault();

			const _this = $(event.currentTarget);
			const order = _this.attr('order');

			$(`.${self.classLink}`).removeClass(self.classLinkActive);
			_this.addClass(self.classLinkActive);

			$('#O')
				.val(order)
				.trigger('change');
		});
	}
});
