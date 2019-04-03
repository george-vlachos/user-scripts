// ==UserScript==
// @name Clozemaster
// @namespace https://github.com/george-vlachos/user-scripts
// @version      1.0
// @description  modifies closemaster.com hiding elements e.g. for leaderboard, daily goal, get pro etc.
// @author       George Vlachos
// @downloadURL  https://github.com/george-vlachos/user-scripts/raw/master/clozemaster.user.js
// @updateURL    https://github.com/george-vlachos/user-scripts/raw/master/clozemaster.user.js
// @match *://*.clozemaster.com/*
// @grant none
// ==/UserScript==

// clozemaster.user.js
(function() {
  "use strict";

  let timeout = null;

  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    setTimeout(() => {
      update();
    }, 1000);
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();

function update() {
  // hide leaderboard
  const leaderboard = document.querySelectorAll(".leaderboard");
  leaderboard.forEach(e => {
    // console.debug("leaderboard hidden");
    updateStyle(e, ".leaderboard", { display: "none" }, true);
  });

  // hide right column (Daily Goal, GIFT PRO etc.)
  const dashboardRichtColumn = document.querySelectorAll(
    ".users.dashboard .challenge>.row>.right-column "
  );
  dashboardRichtColumn.forEach(e => {
    // console.debug("right column hidden");
    updateStyle(e, ".leaderboard", { display: "none" }, true);
  });
  const dashboardLeftColumn = document.querySelectorAll(
    ".users.dashboard .challenge>.row>.col-md-9"
  );
  dashboardLeftColumn.forEach(e => {
    // console.debug("left column expanded");
    e.classList.replace("col-md-9", "col-md-12");
  });
}

function updateStyle(element, selector, newStyle, isImportant) {
  if (element !== null) {
    if (isImportant) {
      Object.keys(newStyle).forEach(key =>
        element.style.setProperty(key, newStyle[key], "important")
      );
    } else {
      Object.assign(element.style, newStyle);
    }
  } else {
    console.warn(`no element found for "${selector}"`);
  }
}
