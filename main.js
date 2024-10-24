const API_KEY = "7f4199cf08c556a2695d47012461a7bd";

import MovieApi from "./api.js";
import { loopSelectionElements, movieParameters } from "./tool_scripts.js";
import { createElement } from "./tool_scripts.js";
import { countryList } from "./country.js";
import { selectOptions } from "./hardCodeOpt.js";

const getGenres = async () => {
  const tempApi = new MovieApi(API_KEY);
  const genres = await tempApi.getGenres();

  //.find((o) => o.name === "Horror")
  let genreParam = genres.data.genres;
  createSelection(genreParam);

  // const newParam = new movieParameters(
  //   "27",
  //   "1960-01-01",
  //   "1979-01-01",
  //   "it",
  //   "15",
  //   "popular.dsc"
  // );

  // const result = await tempApi.getMovies(newParam);
  // const movies = result.data.results;

  // createMovies(movies);
};

function createSelection(genreParam) {
  const selectGenre = loopSelectionElements(genreParam, "Genres");

  inputSection.appendChild(selectCountry);
  inputSection.appendChild(selectGenre);
  inputSection.appendChild(selectSort);
}

const moviesSection = document.querySelector(".movies");
const inputSection = document.querySelector(".form");

const selectSort = loopSelectionElements(selectOptions, "Sort");
const selectCountry = loopSelectionElements(countryList, "countries");

const form = document.querySelector(".form");

const checkParameters = (event) => {
  event.preventDefault();

  console.log(event);
};

form.addEventListener("submit", checkParameters);

function createMovies(movieList) {
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
}

const getCall = async () => {};

getGenres();
