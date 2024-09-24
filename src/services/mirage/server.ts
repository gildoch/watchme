import { ActiveModelSerializer, Server } from 'miragejs';
import watchlistModel from './models/watchlist';
import movieModel from './models/movie';
import watchlistRoutes from './routes/watchlist';
import movieRoutes from './routes/movie';
import fixtures from './fixtures';

export function makeServer() {
  return new Server({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      watchlist: watchlistModel,
      movie: movieModel,
    },

    routes() {
      
      watchlistRoutes.call(this);
      movieRoutes.call(this);
    },
  });
}
