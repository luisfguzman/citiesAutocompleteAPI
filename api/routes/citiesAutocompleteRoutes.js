module.exports = function(app) {
    var citiesAutocomplete = require('../controllers/citiesAutocompleteController');
  
    const path = '/suggestions';
    
    // citiesAutocomplete Routes
    app.route(path)
      .get(citiesAutocomplete.lookup);
};