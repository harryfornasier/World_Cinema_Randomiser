const API_KEY = "7f4199cf08c556a2695d47012461a7bd";

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

const requestGenre = async () => {
  const tempApi = new MovieApi(API_KEY);
  const genres = await tempApi.getGenres();
  let genreParam = genres.data.genres;
  genreParam.unshift({ id: "rd", name: "Random" });
  createSelection(genreParam);
};

const requestMovie = async (discoverMovie) => {
  const tempApi = new MovieApi(API_KEY);
  const result = await tempApi.getMovies(discoverMovie);
  const movies = result.data.results;
  createMovies(movies);
};

function createSelection(genreParam) {
  const selectGenre = loopSelectionElements(genreParam, "Genres");

  inputSection.appendChild(selectCountry);
  inputSection.appendChild(selectGenre);
  inputSection.appendChild(selectSort);
}

function getRandomInt(max) {
  return Math.floor(Math.random(1) * max);
}

const checkParameters = (event) => {
  event.preventDefault();

  const eventTarget = event.target;

  if (eventTarget.languages.value === "rd") {
    const rando = getRandomInt(languages.length);
    eventTarget.languages.value = languages[rando].id;
  }

  if (eventTarget.sort.value === "random") {
    const rando = getRandomInt(selectOptions.length);
    eventTarget.sort.value = selectOptions[rando].id;
  }

  if (eventTarget.Genres.value === "rd") {
    const rando = getRandomInt(eventTarget.Genres.length);
    eventTarget.Genres.value = eventTarget.Genres[rando].value;
  }

  const discoverMovie = new movieParameters(
    eventTarget.Genres.value,
    eventTarget.start.value,
    eventTarget.end.value,
    eventTarget.languages.value,
    1,
    eventTarget.sort.value
  );
  requestMovie(discoverMovie);
};

form.addEventListener("submit", checkParameters);

function createMovies(movieList) {
  moviesSection.innerHTML = "";

  if (movieList.length) {
    for (let i = 0; i < movieList.length; i++) {
      const moviesWrapper = createElement("div", "movies__wrapper");
      const topWrapper = createElement("div", "movies__top-wrapper");
      const movieTitle = createElement("h3", "movies__title", movieList[i].title);
      const movieYear = createElement("h3", "movies__year", movieList[i].release_date);
      const moviePoster = createElement("img", "movies__img");
      const movieVote = createElement("p", "movies__vote", movieList[i].vote_average);

      moviePoster.src = `http://image.tmdb.org/t/p/w500/${movieList[i].backdrop_path}`;

      moviesSection
        .appendChild(moviesWrapper)
        .appendChild(topWrapper)
        .appendChild(movieTitle);

      topWrapper.appendChild(movieYear);
      moviesSection.appendChild(moviePoster);
    }
  } else {
    form.click();
  }
}

requestGenre();
