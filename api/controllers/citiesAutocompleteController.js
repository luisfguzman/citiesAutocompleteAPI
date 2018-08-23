var foo = require('../../public/cities_canada-usa.json');

exports.lookup = function(req, res) {
    var q = req.query.q;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    res.send(foo);
};