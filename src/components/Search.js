import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
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

  // fetch job data
  try {
    const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await response.json();
    if (!response.ok) {
      // Using browser constructor function Error and description from response network
      throw new Error(data.description);
    }
    // extract job items
    const { jobItems } = data;

    // remove spinner since data fetched
    renderSpinner("search");

    // render number of results - badge number
    numberEl.textContent = jobItems.length;

    // render job items in search job list
    renderJobList(jobItems);
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
