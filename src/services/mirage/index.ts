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
      this.get("users", function (schema, request) {
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
      this.get('genres', (schema, request) => {
        const total = genres.length;
        return new Response(200, { "x-total-count": String(total) }, { genres });
      })

      // Movie Endpoints
      this.get('movies', (schema, request) => {
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
      this.get('movies/:id')
      this.post("movies");

      // Watchlist Endpoints
      this.get("watchlists", (schema, request) => {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("watchlist").length;

        const startPage = (Number(page) - 1) * Number(per_page);
        const endPage = startPage + Number(per_page);

        const watchlists = schema.all("watchlist")

        return new Response(200, { "x-total-count": String(total) }, { watchlists });
      });
      this.get('watchlists/:id')
      this.post("watchlists");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
