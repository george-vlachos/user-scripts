// ==UserScript==
// @name SetDuoFontFamily
// @namespace https://github.com/george-vlachos/user-scripts
// @version      1.0
// @description  resets the font-family used in duolingo sites
// @author       George Vlachos
// @downloadURL  https://github.com/george-vlachos/user-scripts/raw/master/set-duo-font-family.user.js
// @updateURL    https://github.com/george-vlachos/user-scripts/raw/master/set-duo-font-family.user.js
// @match *://*.duolingo.com/*
// @grant none
// ==/UserScript==

// https://fonts.google.com/specimen/Open+Sans
const GOOGLE_WEB_FONT =
  "https://fonts.googleapis.com/css?family=Open+Sans:400,400i&amp;subset=greek-ext";

const FONT_STYLE =
  "font-family: 'Open Sans', " +
  "sans-serif !important; " +
  "font-weight: 400 !important; " +
  "font-size: 1rem !important;";

(function() {
  "use strict";

  let timeout = null;

  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    setTimeout(() => addGlobalStyle(), 1000);
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();

function addGlobalStyle() {
  if (!document.getElementById("styleApplied")) {
    const font = document.createElement("link");
    font.setAttribute("href", GOOGLE_WEB_FONT);
    font.setAttribute("rel", "stylesheet");
    document.head.appendChild(font);

    const globalstyle = `*, :after, :before {${FONT_STYLE}}`;

    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.innerHTML = globalstyle;
    document.head.appendChild(styleElement);

    const styleApplied = document.createElement("div");
    styleApplied.setAttribute("id", "styleApplied");
    document.body.appendChild(styleApplied);

    console.debug(new Date(), "Duolingo font family style applied");
  }
}
