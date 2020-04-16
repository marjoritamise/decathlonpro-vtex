APP.component.CustomSelect = ClassAvanti.extend({
    init: function(settings) {
        this.settings = settings;
        this.setup();
        this.start();
        this.bind();
    },

    setup: function() {
        this.settings = jQuery.extend({
            scope: '',
            span: '',
            select: '',
            populateSpan: false,
            createSpan: false,
            spanValue: 'Selecione',
            callback: function (value, text) {}
        }, this.settings);

        this.scope = this.settings.scope,
        this.span = this.settings.span,
        this.select = this.settings.select;
        this.callback = this.settings.callback;
        this.createSpan = this.settings.createSpan;
        this.spanValue = this.settings.spanValue;
        this.populateSpan = this.settings.populateSpan;
    },

    start: function () {
        var text = this.select.find('option:selected').text();
        if(!this.createSpan){
            this.setText(text);
        }
        this.generateSpan();
    },

    generateSpan: function () {
        if(this.createSpan){
            var text = this.select.find('option:selected').text();
            if(this.populateSpan && this.select.find('option').length > 1){
                text = this.spanValue;
            }

            var span =  $('<span>'+text+'</span>');

            span.appendTo(this.scope);
            this.span = span;
        }
    },

    setText: function (text) {
        this.span.text(text);
    },

    change: function () {
        var text = this.select.find('option:selected').text(),
            value = this.select.find('option:selected').val();

        this.setText(text);
        this.callback(value, text);
    },

    bind: function () {
        var _this = this;

        this.select.on({
            change: function () {
                _this.change();
            }
        });
    }
});
