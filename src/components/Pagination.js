import {
  state,
  paginationEl,
  paginationNumberBackEl,
  paginationNumberNextEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  RESULTS_PER_PAGE,
} from "../common.js";
import renderJobList from "./JobList.js";

const renderPaginationButton = () => {
  // display back button if on page 2 or further
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  // display next button if there are more job items on next page
  if (state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }
  // update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  // unfocus or blur buttons
  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");

  if (!clickedButtonEl) return;

  // check if intention is next or back page
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  // update state
  nextPage ? state.currentPage++ : state.currentPage--;

  // Render pagination button - update page numbers
  renderPaginationButton();

  // Render job items for that particular page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButton;
