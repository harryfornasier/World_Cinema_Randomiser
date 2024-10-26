export default class MovieApi {
  constructor(toast, discoverObject) {
    this.mega = toast;
    this.baseURL = "https://api.themoviedb.org/3/";
    this.discoverURL = "discover/movie?include_adult=false&include_video=false&";
  }

  async getMovies(discoverObject) {
    try {
      const response = await axios.get(
        `${this.baseURL}${this.discoverURL}language=${discoverObject.language}&page=${discoverObject.page}&release_date.gte=${discoverObject.dateStart}&release_date.lte=${discoverObject.dateEnd}&sort_by=${discoverObject.sort}&api_key=${this.mega}&with_original_language=${discoverObject.language}&with_genres=${discoverObject.genre}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async getGenres() {
    try {
      const response = await axios.get(
        `${this.baseURL}genre/movie/list?api_key=${this.mega}`
      );
      return response;
    } catch (error) {
      error("Error fetching movies:", error);
    }
  }
}
