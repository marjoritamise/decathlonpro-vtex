var AvantiRequest = new function () {
    this.requests = [];
    this.interval = null;

    this.add = function (object) {
        if (!this.exists(object.name)) {
            this.requests.push(object);
            this.load(object);
        } else {
            this.update(object);
            if (this.checkCompleted(object.name)) {
                this.executeCallbacks(object.name);
            }
        }

        return this;
    };

    this.exists = function (name) {
        for (var i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name === name) {
                return true;
            }
        }

        return false;
    };

    this.checkCompleted = function (name) {
        for (var i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name === name) {
                return this.requests[i].completed;
            }
        }
    },

    this.executeCallbacks = function (name) {
        for (var i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name === name) {
                for (e = 0; e < this.requests[i].callbacks.length; e++) {
                    if (!this.requests[i].callbacks[e].completed) {
                        this.requests[i].callbacks[e].completed = true;
                        this.requests[i].callbacks[e].callback(this.requests[i].data);
                    }
                }
            }
        }
    };

    this.update = function (object) {
        for (var i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name === object.name) {
                for (e = 0; e < object.callbacks.length; e++) {
                    this.requests[i].callbacks.push(object.callbacks[e]);
                }
            }
        }
    };

    this.setData = function(name, data) {
        for (var i = 0; i < this.requests.length; i++) {
            if (this.requests[i].name === name) {
                this.requests[i].completed = true;
                this.requests[i].data = data;
            }
        }
    };

    this.load = function (object) {
        var _this = this;

        var url = object.ajaxConfig.url,
            concat = (url.indexOf('?') > -1) ? '&' : '?';

        $.ajax({
            url: url + concat + 'utm_source=' + Math.floor((Math.random() * 1000000) + 1),
            type: object.ajaxConfig.type,
            success: function (data) {
                _this.setData(object.name, data);
                _this.executeCallbacks(object.name);
            },
            error: function () {
                if (object.persistent) {
                    _this.load(object);
                }
            }
        });
    };
};


