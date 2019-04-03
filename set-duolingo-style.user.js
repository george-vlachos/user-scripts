// ==UserScript==
// @name SetDuolingoStyle
// @namespace https://github.com/george-vlachos/user-scripts
// @version      1.0
// @description  modifies the style of duolingo.com sites (colors)
// @author       George Vlachos
// @downloadURL  https://github.com/george-vlachos/user-scripts/raw/master/set-duolingo-style.user.js
// @updateURL    https://github.com/george-vlachos/user-scripts/raw/master/set-duolingo-style.user.js
// @match *://*.duolingo.com/*
// @grant none
// ==/UserScript==

// set-duolingo-style.user.js
// Used with [Violentmonkey](https://violentmonkey.github.io)

// --------- Change the values here for different colors ---------
// Note: color values are in hex ( https://htmlcolorcodes.com )

// -- black --
// const DARK_COLOR_VALUE = '000000';
// const TEXT_COLOR_VALUE = 'ffffff';
// const TEXT_COLOR_DARK_VALUE = '4c4c4c';

// -- blue --
const DARK_COLOR_VALUE = "3f2b96";
const TEXT_COLOR_VALUE = "ffffff";
const TEXT_COLOR_DARK_VALUE = "4c4c4c";
// ----------------------------------------------------------------

const DARK_COLOR = `#${DARK_COLOR_VALUE}`;
const TEXT_COLOR = `#${TEXT_COLOR_VALUE}`;
const TEXT_COLOR_DARK = `#${TEXT_COLOR_DARK_VALUE}`;

(function() {
  "use strict";
  // eslint-disable-next-line no-unused-vars
  const observer = new MutationObserver((mutations, mutationObserver) => {
    /* Using a single background color */
    updateDocumentBody(DARK_COLOR);

    const tips = document.querySelectorAll("._1TgLl._1E3L7");
    tips.forEach(a => updateStyle(a, "tips", { backgroundColor: DARK_COLOR }));

    const store = document.querySelectorAll("._2hEQd._1E3L7");
    store.forEach(a =>
      updateStyle(a, "store", { backgroundColor: DARK_COLOR })
    );

    if (updateSkillTreeExercise()) return;

    if (updateSkillTree()) return;

    if (updateStory()) return;

    if (updateStories()) return;

    if (updateSubmitABugReport()) return;

    if (updateWordsTable()) return;

    updateElementsLightColor();
    updateElementsDarkColor();
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();

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

function updateDocumentBody(color) {
  updateStyle(document.body, "document.body", { backgroundColor: color });
}

function updateSkillTree() {
  // update the main duolingo.com
  const skillTree = document.querySelectorAll("[data-test='skill-tree']");
  const update = skillTree && skillTree.length > 0;
  if (update) {
    skillTree.forEach(a =>
      updateStyle(a, "skillTree", { backgroundColor: DARK_COLOR })
    );

    const skillTreeTitle = document.querySelectorAll(
      "[data-test='skill-tree'] span._378Tf"
    );
    skillTreeTitle.forEach(a =>
      updateStyle(a, "skillTreeTitle", { color: TEXT_COLOR }, true)
    );

    const lessonIcons = document.querySelectorAll(
      "._2albn>div:first-child:not(._2EYQL)"
    );
    lessonIcons.forEach(a => updateStyle(a, "lessonIcons", { opacity: "0.7" }));

    const other = document.querySelectorAll(
      "a[data-test='lingot-store-button'],._2_lzu"
    );
    other.forEach(a => updateStyle(a, "other", { opacity: "0.9" }));

    return true;
  }
  return false;
}

function updateSkillTreeExercise() {
  // update duolingo.com exercise in the skill tree
  const skillExercise = document.querySelectorAll("[data-test*='challenge']");

  const hasExercise = () => {
    return skillExercise && skillExercise.length > 0;
  };
  if (hasExercise()) {
    document.querySelectorAll("div").forEach(a =>
      updateStyle(a, "div", {
        backgroundColor: DARK_COLOR,
        color: TEXT_COLOR
      })
    );
    document
      .querySelectorAll("button")
      .forEach(a =>
        updateStyle(a, "button", { color: "#000", fontSize: "20px" })
      );
    return true;
  }
  return false;
}

function updateStories() {
  // update stories.duolingo.com
  const storyGrid = document.querySelectorAll(
    ".whole-page.desktop, .home-page, .story-grid"
  );
  const storyHeader = document.querySelectorAll(".stories-header");
  const storySet = document.querySelectorAll(".story-grid .set");
  const storySetHeader = document.querySelectorAll(
    ".story-grid .set .set-header"
  );
  const storyTitle = document.querySelectorAll(
    ".story-grid .set .story .title"
  );
  const hasStories = () => {
    let result = storyGrid && storyGrid.length > 0;
    result = result && storySet && storySet.length > 0;
    result = result && storySetHeader && storySetHeader.length > 0;
    result = result && storyTitle && storyTitle.length > 0;
    return result;
  };

  if (hasStories()) {
    const storiesCompleted = document.querySelectorAll(".story.complete");
    storyGrid.forEach(a =>
      updateStyle(a, "storyGrid", { backgroundColor: DARK_COLOR })
    );
    storyHeader.forEach(a =>
      updateStyle(a, "storyHeader", {
        backgroundColor: DARK_COLOR,
        color: TEXT_COLOR
      })
    );
    storySet.forEach(a =>
      updateStyle(a, "storySet", { backgroundColor: DARK_COLOR })
    );
    storySetHeader.forEach(a =>
      updateStyle(a, "storySetHeader", { color: TEXT_COLOR })
    );
    storyTitle.forEach(a =>
      updateStyle(a, "storyTitle", { color: TEXT_COLOR })
    );

    // making some elements less prominent
    const opacity = "0.6";
    storiesCompleted.forEach(a =>
      updateStyle(a, "storiesCompleted", { opacity })
    );
    return true;
  }
  return false;
}

function updateStory() {
  // update a story in stories.duolingo.com
  const container = document.querySelectorAll(
    ".story-page, .story-header, .transcription-container"
  );

  if (container && container.length > 0) {
    const storyTextTitle = document.querySelectorAll(".title .synced-text");
    const storyText = document.querySelectorAll(
      ".phrase, .synced-text, .answer, .challenge-question, .title.completed"
    );
    const storyTextDark = document.querySelectorAll(
      ".point-to-phrase-synced-text.highlighted, .phrase-bank>span, .story-end-section"
    );

    container.forEach(a =>
      updateStyle(a, "container", {
        backgroundColor: DARK_COLOR,
        color: TEXT_COLOR
      })
    );
    storyText.forEach(a =>
      updateStyle(a, "storyContainer", { color: TEXT_COLOR })
    );
    storyTextDark.forEach(a =>
      updateStyle(a, "storyContainer", { color: TEXT_COLOR_DARK })
    );
    storyTextTitle.forEach(a =>
      updateStyle(a, "storyContainer", { color: TEXT_COLOR })
    );
    return true;
  }
  return false;
}

function updateSubmitABugReport() {
  const main = document.querySelectorAll('main[role="main"]');
  if (main && main.length > 0) {
    main.forEach(a =>
      updateStyle(a, "main", {
        backgroundColor: DARK_COLOR,
        color: TEXT_COLOR
      })
    );
    const text = document.querySelectorAll("h1,p");
    text.forEach(a => updateStyle(a, "text", { color: TEXT_COLOR }));
    return true;
  }
  return false;
}

function updateWordsTable() {
  // https://www.duolingo.com/words
  const words = document.querySelectorAll("._3zjVe");
  if (words && words.length > 0) {
    words.forEach(a =>
      updateStyle(a, "words table", { backgroundColor: DARK_COLOR })
    );
    const title = document.querySelectorAll("._3zjVe h1");
    title.forEach(a => updateStyle(a, "words title", { color: TEXT_COLOR }));
    const cell = document.querySelectorAll("tr.VjtrX>td");
    cell.forEach(a => updateStyle(a, "words cell", { color: TEXT_COLOR }));
    const info = document.querySelectorAll(".NYMhm h2, ._3Io2c");
    info.forEach(a => updateStyle(a, "words info", { color: TEXT_COLOR }));
    return true;
  }
  // single word entry
  const wordContainer = "._2Aw8b";
  const wordSearch = ".sxmhN";
  const wordEntry = "._2Aw8b tr";
  const word = document.querySelectorAll(
    `${wordContainer},${wordEntry},${wordSearch}`
  );
  if (word && word.length > 0) {
    word.forEach(a =>
      updateStyle(a, "words table", { backgroundColor: DARK_COLOR })
    );
  }
  return false;
}

function updateElementsLightColor() {
  const x1 = ".Af4up";
  const links = document.querySelectorAll(`a:not(${x1})`);
  links.forEach(a => updateStyle(a, "links", { textDecoration: "underline" }));

  const forum = "._1RSpr"; // subscriptions
  const forumRelatedDiscussions = "._1y1Vb";
  const userInNotificationsPopup = '[rel="nofollow"]';
  const titleInNotificationsPopup = ".Rl0dL";
  const reactModalTitle = ".vkTiF";
  const el =
    `h1:not(${titleInNotificationsPopup}), ` +
    `h2:not(${forum}), ` +
    `h3:not(${reactModalTitle}), ` +
    `h4:not(${reactModalTitle}), h5, h6, td, p`;
  const elA = `a:not([data-test="lingot-store-button"]):not(${forumRelatedDiscussions}):not(${userInNotificationsPopup}):not(._3sWvR)`;
  const elUl = "ul:not(._1ZY-H):not(._1XE6M)>li:not(._1Eh9P):not(._1CkMd)";
  const elOl = "ol>li";
  const text = document.querySelectorAll(`${el},${elA},${elUl},${elOl}`);
  text.forEach(a => updateStyle(a, "text", { color: TEXT_COLOR }));
}

function updateElementsDarkColor() {
  const wagerWon = "ul>li._26XGQ,ul>li._26XGQ span";
  const forumUserMenuOptions = ".PfiUE";
  const darkText = document.querySelectorAll(
    `code,${wagerWon},${forumUserMenuOptions},.story-end-section`
  );
  darkText.forEach(a => updateStyle(a, "darkText", { color: TEXT_COLOR_DARK }));
}
