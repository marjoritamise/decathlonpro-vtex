var AvantiDelayed = new function () {
    this.actions = [];
    this.interval = null;
    this.objectConfig = {
        time: 500,
        showDebug: false
    };

    this.config = function (object) {
        for (var attrname in object) {
            this.objectConfig[attrname] = object[attrname];
        }
        return this;
    };

    this.list = function () {
        return this.actions;
    };

    this.size = function () {
        return this.actions.length;
    };

    this.verify = function () {
        var length = this.actions.length;

        if (length < 1) {
            this.stopInterval();
        } else if (length > 0 && this.interval == null) {
            this.startInterval();
        }
    };

    this.verifyTime = function () {
        var length = this.actions.length
            newTime = 0;

        for (i = 0; i < length; i++) {
            var time = this.actions[i].time;

            newTime = (i == 0) ? time : newTime;

            if (time <= newTime) {
                this.config({time: time});
            }
        }
    },

    this.add = function (object) {
        this.addAction(object);
        //this.verifyTime();
        this.verify();
        return this;
    };

    this.addAction = function (object) {
        this.actions.push(object);
    };

    this.remove = function (object) {
        var index = this.actions.indexOf(object);

        if (index > -1) {
            this.actions.splice(index, 1);
            //this.verifyTime();
        }
    };

    this.removeMultiples = function (arr) {
        var length = this.actions.length;

        for (i = 0; i < length; i++) {
            this.remove(arr[i]);
        }
    };

    this.startInterval = function () {
        var _this = this;

        this.interval = setInterval(function () {
            _this.run();
        }, this.objectConfig.time);

        //console.log('[START INTERVAL]');
    };

    this.stopInterval = function () {
        clearInterval(this.interval);
        this.interval = null;
        //console.log('[STOP INTERVAL]');
    };

    this.run = function () {
        this.debug();

        var arrRemove = [],
            length = this.actions.length;

        for (i = 0; i < length; i++) {
            if (this.actions[i].condition()) {
                this.actions[i].callback();

                if (!this.actions[i].persistent) {
                    arrRemove.push(this.actions[i]);
                }
            }
        }

        this.removeMultiples(arrRemove);
        this.verify();
    };

    this.debug = function () {
        if (this.objectConfig.showDebug) {
            console.log('-----------------------------')
            console.log(this.objectConfig);
            console.log("[" + this.size() + "] ");
            console.log(this.list());
        }
    };
};
