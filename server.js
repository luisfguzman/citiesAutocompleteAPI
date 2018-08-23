const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000;

var routes = require('./api/routes/citiesAutocompleteRoutes'); //importing route
routes(app); //register the route

// enabling static files
app.use(express.static('public'));

// middleware for 404 errors
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('cities autocomplete RESTful API server started on: ' + port);