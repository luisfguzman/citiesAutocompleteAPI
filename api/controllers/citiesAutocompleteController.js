exports.lookup = function(req, res) {
    var q = req.query.q;
    var latitude = req.query.latitude;
    var longitude = req.query.longitude;
    res.send('hi');
};