const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000;

const routes = require('./api/routes/citiesAutocompleteRoutes'); //importing route
const searchServices = require('./api/services/searchServices');

routes(app); //register the route
searchServices(app);

// enabling static files
app.use(express.static('public'));

// middleware for 404 errors
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('cities autocomplete RESTful API server started on: ' + port);