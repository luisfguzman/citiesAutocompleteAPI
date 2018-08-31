const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const routes = require('./api/routes/citiesAutocompleteRoutes'); //importing route
const searchServices = require('./api/services/searchServices');

routes(app); //register the route
searchServices.registerSearchServices(app); //register the search services

// enabling static files
app.use(express.static('public'));

// middleware for 404 errors
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// middleware for 400 errors bad request
app.use((err, req, res, next) => {
    // log the error...
    // if (err)
    //     console.error(err);
    res.status(err.httpStatusCode).send({error : err.message});
});

module.exports = app.listen(port);

console.log('cities autocomplete RESTful API server started on: ' + port);