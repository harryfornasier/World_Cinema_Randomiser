const beans = "7f" + "41" + "99cf0" + "8c55" + "6a269" + "5d470" + "1246" + "1a7bd";

import MovieApi from "./api.js";
import { loopSelectionElements, movieParameters } from "./tool_scripts.js";
import { createElement } from "./tool_scripts.js";
import { languages } from "./country.js";
import { selectOptions } from "./hardCodeOpt.js";

const moviesSection = document.querySelector(".movies");
const inputSection = document.querySelector(".form");

const selectSort = loopSelectionElements(selectOptions, "sort");
const selectCountry = loopSelectionElements(languages, "languages");

const form = document.querySelector(".form");

let checkAgain = false;
let pageCount = 1;
let maxPage = 100;

const pageUp = () => {
  if (pageCount <= maxPage) {
    pageCount++;
    document.getElementById("submitButton").click();
    window.scrollTo(0, 0);
  }
};

const pageDown = () => {
  if (pageCount > 1) {
    pageCount--;
    document.getElementById("submitButton").click();
    window.scrollTo(0, 0);
  }
};

const nextPage = document.querySelector(".nextPage");
nextPage.addEventListener("click", pageUp);

const lastPage = document.querySelector(".lastPage");
lastPage.addEventListener("click", pageDown);

const requestGenre = async () => {
  const tempApi = new MovieApi(beans);
  const genres = await tempApi.getGenres();
  let genreParam = genres.data.genres;
  genreParam.unshift({ id: "rd", name: "Random" });
  createSelection(genreParam);
};

const requestMovie = async (discoverMovie) => {
  const tempApi = new MovieApi(beans);
  const result = await tempApi.getMovies(discoverMovie);
  const movies = result.data;

  maxPage = movies.total_pages;

  if (movies.results.length) {
    createMovies(movies);
  } else {
    checkAgain = true;
    document.getElementById("submitButton").click();
    const failElement = createElement(
      "h2",
      "failElement",
      "There appear to be no movies with the selected parameters."
    );

    moviesSection.textContent = "";
    moviesSection.appendChild(failElement);
  }
};

function createSelection(genreParam) {
  const selectGenre = loopSelectionElements(genreParam, "Genres");

  const selectButton = createElement(
    "button",
    "submit__button",
    "Randomise",
    "submitButton"
  );
  selectButton.type = "submit";

  inputSection.appendChild(selectCountry);
  inputSection.appendChild(selectGenre);
  inputSection.appendChild(selectSort);
  inputSection.appendChild(selectButton);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const checkParameters = (event) => {
  event.preventDefault();

  const eventTarget = event.target;

  if (eventTarget.languages.value === "rd" || checkAgain) {
    languages.shift();
    const rando = getRandomInt(languages.length);
    eventTarget.languages.value = languages[rando].id;
  }

  if (eventTarget.sort.value === "random" || checkAgain) {
    selectOptions.shift();
    const rando = getRandomInt(selectOptions.length);
    eventTarget.sort.value = selectOptions[rando].id;
  }

  if (eventTarget.Genres.value === "rd" || checkAgain) {
    delete eventTarget.Genres[0].remove();
    const rando = getRandomInt(eventTarget.Genres.length);
    eventTarget.Genres.value = eventTarget.Genres[rando].value;
  }

  const discoverMovie = new movieParameters(
    eventTarget.Genres.value,
    eventTarget.start.value,
    eventTarget.end.value,
    eventTarget.languages.value,
    pageCount,
    eventTarget.sort.value
  );
  checkAgain = false;
  requestMovie(discoverMovie);
};

form.addEventListener("submit", checkParameters);

function createMovies(movieListObj) {
  moviesSection.innerHTML = "";
  let movieList = movieListObj.results;
  document.querySelector(".page-text").innerText = movieListObj.page;
  if (movieList.length) {
    for (let i = 0; i < movieList.length; i++) {
      const moviesWrapper = createElement("div", "movies__wrapper");
      const topWrapper = createElement("div", "movies__top-wrapper");
      const movieTitle = createElement("p", "movies__title", movieList[i].title);
      const movieYear = createElement("p", "movies__year", movieList[i].release_date);
      const moviePoster = createElement("img", "movies__img");
      const movieVote = createElement("p", "movies__vote", movieList[i].vote_average);
      const details = createElement("details", "movies__details", movieList[i].overview);
      const bottomWrapper = createElement("div", "movies__bottom-wrapper");
      const description = createElement("summary", "movies__description", "More details");
      const ytSearch = createElement("a", "movies__link", "Search Youtube for movie");

      ytSearch.href = `https://www.youtube.com/results?search_query=${movieList[i].title}`;

      if (movieList[i].backdrop_path) {
        moviePoster.src = `http://image.tmdb.org/t/p/w500/${movieList[i].backdrop_path}`;
      } else {
        moviePoster.src = "image-not-found.png";
      }

      moviesSection
        .appendChild(moviesWrapper)
        .appendChild(topWrapper)
        .appendChild(movieTitle);

      topWrapper.appendChild(movieYear);
      moviesWrapper.appendChild(moviePoster);
      bottomWrapper.appendChild(details).appendChild(description);
      bottomWrapper.appendChild(ytSearch);
      moviesWrapper.appendChild(bottomWrapper);
    }
  } else {
    form.click();
  }
}

requestGenre();
