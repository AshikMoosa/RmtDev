import {
  BASE_API_URL,
  jobListSearchEl,
  jobDetailsContentEl,
  getData,
  state,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";

const renderJobList = () => {
  // remove previous job items
  jobListSearchEl.innerHTML = "";

  state.searchJobItems.slice(0, 7).forEach((jobItem) => {
    const newJobItemHTML = `
          <li class="job-item">
            <a class="job-item__link" href="${jobItem.id}">
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
              </a>
          </li>`;
    jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });
};

// -- JOB LIST COMPONENT --
const clickHandler = async (event) => {
  // prevent default navigation from anchor tag under li elements
  event.preventDefault();

  // get clicked job item element
  const jobItemEl = event.target.closest(".job-item");

  // remove the active class from previously active job item
  document
    .querySelector(".job-item--active")
    ?.classList.remove(".job-item--active");

  // add active class
  jobItemEl.classList.add("job-item--active");

  // clear initial job details sections
  jobDetailsContentEl.innerHTML = "";

  // render spinner
  renderSpinner("job-details");

  // find id of the job item which needs to be shown in detail
  const id = jobItemEl.children[0].getAttribute("href");

  try {
    // fetch job details based on id
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    // extract job item
    const { jobItem } = data;

    // remove spinner
    renderSpinner("job-details");

    // render job details
    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
