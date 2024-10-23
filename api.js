export default class MovieApi {
  constructor(apiKey, discoverObject) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.themoviedb.org/3/";
    this.discoverURL = "discover/movie?include_adult=true&include_video=false&";
  }

  async getMovies(discoverObject) {
    try {
      console.log(discoverObject);
      const response = await axios.get(
        `${this.baseURL}${this.discoverURL}language=${discoverObject.language}&page=${discoverObject.page}&release_date.gte=${discoverObject.dateStart}&release_date.lte=${discoverObject.dateEnd}&sort_by=${discoverObject.sort}&api_key=${this.apiKey}&with_original_language=${discoverObject.language}&with_genres=${discoverObject.genre}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async getGenres() {
    try {
      const response = await axios.get(
        `${this.baseURL}genre/movie/list?api_key=${this.apiKey}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
}
