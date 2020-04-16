APP.component.FilterColors = ClassAvanti.extend({
	init: function () {
		const self = this;

		self.setup();
		self.start();
	},

	setup: function () {
		const self = this;


	},

	start: function () {
		const self = this;

		self._createColorsElement();
	},

	_createColorsElement: function () {
		const self = this;
		$('.search-multiple-navigator fieldset').find('label').each(function(){
			$(this).find('[rel*=specificationFilter_24]').closest('fieldset').addClass('Cor').find('>h5').html('Cores');

		});
		setTimeout(function(){
			self.$colors = $('.refino.Cor');
			self.$inputs = self.$colors.find('input');
			self.$inputs.each((i, e) => {
				const _this = $(e);

				const rel = _this.attr('rel');

				let color;
				[ , color ] = rel.split(':');

				const imageName = self._slugfy(color.toLocaleLowerCase());
				const src = `/arquivos/thumb-cor_${imageName}.png`;
				const $image = $('<div />', {
					class: `color__image color__image--${imageName}`,
					style: `background-image: url('${src}')`
				});

				self._checkImage(src, (err) => {
					if (err) {
						$image.addClass('color__image--no-image');
					}
				});

				_this.before($image);

			});
			$('.search-multiple-navigator .Cor label').each(function(){
				$(this).contents().eq(2).remove();
			});			
		});
	},

	_slugfy: function (color) {
		const self = this;

		return color.replace(/\W/g, '-');
	},

	_checkImage: function (src, callback) {
		const image = new Image();

		image.src = src;
		image.onload = callback(false);
		image.onerror = callback(true);
	}
});
