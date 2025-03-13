import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // dont continue if user clicked outside bokmark button
  if (!event.target.className.includes("bookmark")) return;

  // update state
  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItems) => bookmarkJobItems.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // make bookmark button active/inactive
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked ");
};

const mouseEnterHandler = () => {
  // make bookmarks button look active
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmarks job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  // make bookmarks button look inactive
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  // make job list not visible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
