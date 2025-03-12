import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButton from "./Pagination.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop if no clicked button element
  if (!clickedButtonEl) return;

  // update statae
  state.currentPage = 1;

  // check if intention is relevant or recent
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // make sorting button look (in) active
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    sortingBtnRecentEl.classList.remove("sorting__button--active");
  }
  // sort job items
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  // render paginaion buttons
  renderPaginationButton();

  // render job items in list after sorting
  renderJobList();
};
sortingEl.addEventListener("click", clickHandler);
