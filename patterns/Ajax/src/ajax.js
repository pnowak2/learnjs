(function (tddjs, console, window) {

    'use strict';

    var ajax = tddjs.namespace("ajax"),

        create = function () {
            var options = [

                    function () {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    },

                    function () {
                        return new XMLHttpRequest();
                    }
                ],
                xhr = null,
                i;

            for (i = 0; i < options.length; i += 1) {
                try {
                    if (xhr = options[i]()) {
                        break;
                    }
                } catch (ignore) {}
            }

            return xhr;
        },

        isLocal = function () {
            console.log(window.location.protocol);
            return !!(window.location && window.location.protocol.indexOf("file:") === 0);
        },

        requestComplete = function (transport, options) {

            var status = transport.status;

            if (status == 200 || (isLocal() && !status)) {
                if (typeof options.success == "function") {
                    options.success(transport);
                }
            }
        },

        get = function (url, options) {
            if (typeof url != "string") {
                throw new TypeError("URL should be string");
            }

            options = options || {};
            var transport = ajax.create();
            transport.open("GET", url, true);
            transport.onreadystatechange = function () {
                if (transport.readyState == 4) {
                    requestComplete(transport, options);
                }
            };
            transport.send(null);
        }

    ajax.create = create;
    ajax.get = get;

})(tddjs, console, window);