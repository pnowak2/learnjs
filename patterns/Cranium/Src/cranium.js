(function (global) {
    var Cranium = global.Cranium = {};

    /**
     * DOM
     */
    global.$ = document.querySelector.bind(document);

    /**
     * Events
     */
    var Events = Cranium.Events = {
        channels: {},
        eventNumber: 0,
        on: function (events, callback) {
            Cranium.Events.channels[events + --Cranium.Events.eventNumber] = callback;
        },
        off: function (topic) {
            delete Cranium.Events.channels[topic];
        },
        trigger: function (events, data) {
            var args = Array.prototype.slice.call(arguments, 1);

            for (var topic in Events.channels) {
                if (Events.channels.hasOwnProperty(topic)) {
                    if (topic.split("-")[0] === events) {
                        Events.channels[topic].apply(this, args);
                    }
                }
            }
        }
    }

    /**
     * Model
     */
    var Model = Cranium.Model = function (attributes) {
        this.id = _.uniqueId('model');
        this.attributes = attributes || {};
    };

    Cranium.Model.prototype.get = function (attrName) {
        if ((void 0) == attrName) {
            throw "Attribute name undefined";
        }

        return this.attributes[attrName];
    };

    Cranium.Model.prototype.set = function (attrs) {
        if (_.isObject(attrs)) {
            _.extend(this.attributes, attrs);
            this.change(this.attributes);

        } else {
            throw "Must be object";
        }

        return this;
    };

    Cranium.Model.prototype.toJSON = function () {
        return _.clone(this.attributes);
    };

    Cranium.Model.prototype.change = function (attrs) {
        this.trigger(this.id + 'update', attrs);
    };

    _.extend(Cranium.Model.prototype, Cranium.Events);

    /**
     * View
     */
    var View = Cranium.View = function () {

    }

})(this);