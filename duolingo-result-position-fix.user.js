// ==UserScript==
// @name DuolingoResultPositionFix
// @namespace https://github.com/george-vlachos/user-scripts
// @version      1.0
// @description  fix the position of the result (bottom) after an exercise in duolingo.com
// @author       George Vlachos
// @downloadURL  https://github.com/george-vlachos/user-scripts/raw/master/duolingo-result-position-fix.user.js
// @updateURL    https://github.com/george-vlachos/user-scripts/raw/master/duolingo-result-position-fix.user.js
// @match *://*.duolingo.com/*
// @grant none
// ==/UserScript==

// duolingo-result-position-fix.user.js
// Used with [Violentmonkey](https://violentmonkey.github.io).

// Script to fix the position of the result after an exercise
// especially in small browser width

const RESULT_CLASS = "._1l6NK";

(function() {
  "use strict";

  let timeout = null;

  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    setTimeout(() => {
      addFix();
    }, 1000);
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();

function addFix() {
  const element = document.querySelectorAll(RESULT_CLASS);

  if (element.length > 0) {
    if (window.innerWidth >= 700) {
      element.forEach(a => {
        a.style.setProperty("position", "fixed", "important");
        a.style.setProperty("bottom", "0", "important");
        a.style.setProperty("left", "10vw", "important");
      });

      // console.debug(new Date(), "added result fix");
      return true;
    }

    return false;
  } else {
    return false;
  }
}
