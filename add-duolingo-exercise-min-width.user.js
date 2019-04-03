// ==UserScript==
// @name AddDuolingoExerciseMaxWidthFix
// @namespace https://github.com/george-vlachos/user-scripts
// @version      1.0
// @description  increase the maximum width of the main section in duolingo.com tree exercises
// @author       George Vlachos
// @downloadURL  https://github.com/george-vlachos/user-scripts/raw/master/add-duolingo-exercise-min-width.user.js
// @updateURL    https://github.com/george-vlachos/user-scripts/raw/master/add-duolingo-exercise-min-width.user.js
// @match *://*.duolingo.com/*
// @grant none
// ==/UserScript==

// add-duolingo-exercise-min-width.user.js
// Used with [Violentmonkey](https://violentmonkey.github.io).

// Script to increase the maximum width to come up to the media query
// May help with cases where there are 3 rows of suggested words
// and some content is hidden (overlap)

const MAIN_EXERCISE_CLASS = ".bPbf1";

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
  const mainExerciseElement = document.querySelectorAll(MAIN_EXERCISE_CLASS);

  if (mainExerciseElement.length > 0) {
    if (window.innerWidth >= 700) {
      mainExerciseElement.forEach(a => {
        a.style.setProperty(
          "transition",
          "max-width .3s ease-in-out",
          "important"
        );
        a.style.setProperty("max-width", "700px", "important");
      });
      // console.debug(new Date(), "added max width fix");
      return true;
    }

    return false;
  } else {
    return false;
  }
}
