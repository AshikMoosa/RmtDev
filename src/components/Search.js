import {
  BASE_API_URL,
  state,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

// -- SEARCH COMPONENT --
const submitHandler = async (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text or value
  const searchText = searchInputEl.value;

  // validation (regular expression)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  // blur input after form submit
  searchInputEl.blur();

  // remove jobitems
  jobListSearchEl.innerHTML = ``;

  // render spinner since we are fetching job data
  renderSpinner("search");

  try {
    // fetch job data
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    // extract job items
    const { jobItems } = data;

    // update state
    state.searchJobItems = jobItems;

    // remove spinner since data fetched
    renderSpinner("search");

    // render number of results - badge number
    numberEl.textContent = jobItems.length;

    // render job items in search job list
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
