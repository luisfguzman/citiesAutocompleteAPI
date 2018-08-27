exports.lookup = function(req, res) {
    const dataServices = require('../services/dataServices');

    const q = req.query.q;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const searchResults = req.app.locals.transducer.transduce(q, 1);
    const results = dataServices.populateCityData(searchResults, req);
    res.send({suggestions: results});
};