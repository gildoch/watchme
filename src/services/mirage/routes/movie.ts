export default function movieRoutes() {
    this.post('/watchlists/:id/movies', (schema, request) => {
      let newMovie = JSON.parse(request.requestBody);
      let watchlistId = request.params.id;
      let watchlist = schema.watchlists.find(watchlistId);
      return watchlist.createMovie(newMovie);
    });
  
    this.get('/watchlists/:id/movies', (schema, request) => {
      let watchlistId = request.params.id;
      return schema.movies.where({ watchlistId });
    });
  }
  