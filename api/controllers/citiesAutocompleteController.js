exports.lookup = function(req, res) {
    const dataServices = require('../services/dataServices');

    const q = req.query.q;
    const latitude = Number.parseInt(req.query.latitude);
    const longitude = Number.parseInt(req.query.longitude);
    const radius = Number.parseInt(req.query.radius);
    const searchResults = req.app.locals.transducer.transduce(q, 5);
    const results = dataServices.populateCityData(searchResults, latitude, longitude, radius, req);
    res.send({suggestions: results});
};