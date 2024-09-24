export default function watchlistRoutes() {
    this.namespace = 'api';
  
    this.get('/watchlists', (schema) => {
      return schema.watchlists.all();
    });
  
    this.post('/watchlists', (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      return schema.watchlists.create(attrs);
    });
  
    this.put('/watchlists/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let watchlist = schema.watchlists.find(id);
      return watchlist.update(newAttrs);
    });
  
    this.del('/watchlists/:id', (schema, request) => {
      let id = request.params.id;
      let watchlist = schema.watchlists.find(id);
      return watchlist.destroy();
    });
  }
  