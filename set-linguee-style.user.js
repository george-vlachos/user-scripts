// ==UserScript==
// @name SetLingueeStyle
// @namespace https://github.com/george-vlachos/user-scripts
// @version      1.0
// @description  modifies the style linguee.com (better display in narrow widths)
// @author       George Vlachos
// @downloadURL  https://github.com/george-vlachos/user-scripts/raw/master/set-linguee-style.user.js
// @updateURL    https://github.com/george-vlachos/user-scripts/raw/master/set-linguee-style.user.js
// @match *://*.linguee.com/*
// @grant none
// ==/UserScript==

// set-linguee-style.user.js
// Used with [Violentmonkey](https://violentmonkey.github.io).

(function() {
  "use strict";

  const updateStyle = (element, selector, newStyle) =>
    element !== null
      ? Object.assign(element.style, newStyle)
      : console.warn(`no element found for "${selector}"`);

  const maxWidth = "90%";
  const margin = "0 auto";
  const padding = 0;
  const transformStyle = "unset";

  const mainlayoutStyle = { maxWidth, margin, padding, transformStyle };
  const maindivStyle = { maxWidth, margin, padding, transformStyle };

  let mainlayout = document.getElementById("mainlayout");
  updateStyle(mainlayout, "mainlayout", mainlayoutStyle);
  let maindiv = document.getElementById("maindiv");
  updateStyle(maindiv, "maindiv", maindivStyle);

  const observer = new MutationObserver(() => {
    mainlayout = document.getElementById("mainlayout");
    updateStyle(mainlayout, "mainlayout", mainlayoutStyle);
    maindiv = document.getElementById("maindiv");
    updateStyle(maindiv, "maindiv", maindivStyle);
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();
