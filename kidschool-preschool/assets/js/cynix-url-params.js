(function() {
    'use strict';

    if (window.CynixUrlParamsLoaded) {
        return;
    }

    window.CynixUrlParamsLoaded = true;

    var script = document.createElement('script');
    script.src = '../../_shared/js/cynix-url-params.js';
    script.async = false;
    document.head.appendChild(script);
})();
