module.exports = function(app) {
    const citiesAutocomplete = require('../controllers/citiesAutocompleteController');
  
    const path = '/suggestions';
    
    // citiesAutocomplete Routes
    app.route(path)
      .get(citiesAutocomplete.lookup);
};