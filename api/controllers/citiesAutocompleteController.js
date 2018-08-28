exports.lookup = function(req, res) {
    const dataServices = require('../services/dataServices');

    const q = req.query.q;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const searchResults = req.app.locals.transducer.transduce(q, 10);
    console.log(searchResults);
    const results = dataServices.populateCityData(searchResults, latitude, longitude, req);
    res.send({suggestions: results});
};