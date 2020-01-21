// ==UserScript==
// @name         LIHKG imgur viewer
// @namespace    https://github.com/jomut9/lihkg-imgur-viewer/
// @version      0.1.2
// @description  View media hosted on imgur
// @author       jomut9
// @include      *://lihkg.com/thread/*
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @updateURL    https://github.com/jomut9/lihkg-imgur-viewer/raw/master/lihkg-imgur-viewer.user.js
// @downloadURL  https://github.com/jomut9/lihkg-imgur-viewer/raw/master/lihkg-imgur-viewer.user.js
// ==/UserScript==

(function (){
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === document.ELEMENT_NODE) {
                        var els = node.querySelectorAll("a[href^='https://imgur.com/']");
                        if(els.length != 0){
                            for (const el of els){
                                var split = el.getAttribute('href').split('/');
                                var bq = document.createElement("blockquote");
                                var dataid = (split[3] == 'gallery' ? split[4]: split[3] + "/" + split[4]);
                                bq.className = "imgur-embed-pub";
                                bq.lang = 'en';
                                bq.dataset.id = dataid;
                                var a = document.createElement("a");
                                a.href = "//" + split[2] + "/" + split[3] + "/" + split[4];
                                bq.appendChild(a);

                                var script = document.createElement("script");
                                script.async = "";
                                script.src = "//s.imgur.com/min/embed.js";
                                script.charset = "utf-8";
                                el.insertAdjacentElement("afterend", bq);
                                el.insertAdjacentElement("afterend", script);
                            }
                        }
                    }
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
