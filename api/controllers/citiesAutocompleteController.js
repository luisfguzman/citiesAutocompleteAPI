exports.lookup = function(req, res) {
    const dataServices = require('../services/dataServices');
    const validation = require('../validation/inputValidation');

    const q = req.query.q;
    let latitude, longitude, radius;

    if(!!req.query.latitude)
        latitude = Number.parseFloat(req.query.latitude);
    if(!!req.query.longitude)
        longitude = Number.parseFloat(req.query.longitude);
    if(!!req.query.radius)
        radius = Number.parseInt(req.query.radius);

    validation.inputValidation(q, latitude, longitude, radius);

    const searchResults = req.app.locals.transducer.transduce(q, 5);
    const results = dataServices.populateCityData(searchResults, latitude, longitude, radius, req);
    res.send({suggestions: results});
};