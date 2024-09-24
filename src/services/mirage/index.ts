import {
  Model,
  createServer,
  Factory,
  ActiveModelSerializer,
  Response,
} from "miragejs";
import { faker } from "@faker-js/faker";
import db from './db.json' assert {type: 'json'}
const genres = db.genres
const dbmovies = db.movies

type User = {
  name: string;
  email: string;
  created_at: string;
};

type Genre = {
  id: number,
  name: string,
  title: string
}

type Watchlist = {
  id: string,
  name: string,
  description: string
}


const movieGenres = [
  'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
  'Romance', 'Thriller', 'Western', 'Sci-Fi', 'Documentary',
  'Animation', 'Adventure', 'Crime', 'Musical'
];

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    factories: {
      // Define a user factory
      user: Factory.extend<Partial<User>>({
        name() {
          return faker.person.fullName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        created_at() {
          return faker.date.anytime().toString();
        },
      }),
      // Define a watchlist factory
      watchlist: Factory.extend<Partial<Watchlist>>({
        name() {
          return faker.company.name();
        },
        description() {
          return faker.lorem.sentence();
        },
      }),
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      watchlist: Model.extend<Partial<Watchlist>>({})

    },

    seeds(server) {
      server.createList("user", 5);
      server.createList("watchlist", 5);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      // User Endpoints
      this.get("users",  function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const startPage = (Number(page) - 1) * Number(per_page);
        const endPage = startPage + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          startPage,
          endPage
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      }),

      this.get('users/:id')
      this.post("users");

      // Genre Endpoints
      this.get('genres', function (schema, request)  {
        const total = genres.length;
        return new Response(200, { "x-total-count": String(total) }, { genres });
      })

      // Movie Endpoints
      this.get('movies', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = dbmovies.length;

        const startPage = (Number(page) - 1) * Number(per_page);
        const endPage = startPage + Number(per_page);

        const movies = dbmovies.slice(
          startPage,
          endPage
        );

        return new Response(200, { "x-total-count": String(total) }, { movies });
      })

      this.get('movies/:id',function(schema, request){
        const {id} = request.params
        const movie = dbmovies.filter(movie => movie.imdbID ===  id)
        const total = movie.length;

        console.log("XXX", movie);
        
        return new Response(200, { "x-total-count": String(total) }, { movie });
      })
      this.post("movies");

      // Watchlist Endpoints
      this.get("watchlists", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("watchlist").length;

        const startPage = (Number(page) - 1) * Number(per_page);
        const endPage = startPage + Number(per_page);

        const watchlists = this.serialize(schema.all("watchlist")).watchlists.slice(
          startPage,
          endPage
        );  
       
        return new Response(200, { "x-total-count": String(total) }, { watchlists });
      });

      this.get('watchlists/:id',function(schema, request){
        const {id} = request.params
        const watchlist = this.serialize(schema.all("watchlist")).watchlists.filter((watchlist:Watchlist) => watchlist.id ===  id)
        const total = watchlist.length;

        console.log("XXX", watchlist);
        
        return new Response(200, { "x-total-count": String(total) }, { watchlist });
      })
      this.post("watchlists");
      this.put("/watchlists/:id", function (schema, request){
        let newAttrs = JSON.parse(request.requestBody);
        const {id} = request.params
        let watchlist = this.serialize(schema.all("watchlist")).watchlists.filter((watchlist:Watchlist) => watchlist.id ===  id)
        return watchlist.u
      })

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
