exports.populateCityData = function (results, latitude, longitude, radius, req) {
    const gis = require('../lib/gis');
    const searchServices = require('../services/searchServices');

    let cityDataArray = [];
    for (const r of results) {
        const cities = req.app.locals.citiesData.filter(o => o.name === r[0]);
        for (let city of cities) {
            const fullName = city.ascii + ', ' + city.admin1 + ', ' + city.country;
            let distance;
            let include = true;

            city = (({ name, latitude, longitude }) => ({ name, latitude, longitude }))(city);

            if (latitude && longitude) {
                distance = gis.calculateDistance(city.latitude, city.longitude,latitude, longitude);
                include = (radius && (distance > radius)) ? false : true;
            }

            if (include) {
                city.score = searchServices.calculateSearchScore(distance, r[1]);
                city.name = fullName;
                cityDataArray.push(city);
            }
        }
    }

    return cityDataArray.sort(searchServices.compareValues('score', 'desc'));
}