exports.populateCityData = function(results, latitude, longitude, req) {
    const gis = require('../lib/gis');
    let cityDataArray = [];
    for (const r of results) {
        const cities = req.app.locals.citiesData.filter(o => o.name === r[0]);
        for(let city of cities) {
            const name = city.ascii + ', ' + city.admin1 + ', ' + city.country;
            city = (({ name, lat, long }) => ({ name, lat, long }))(city);
            if(latitude && longitude) {
                const distance = gis.calculateDistance(city.lat, city.long, Number.parseInt(latitude), Number.parseInt(longitude));
            }
            city.score = 0.0;
            city.name = name;
            cityDataArray.push(city);
        }
    }

    return cityDataArray;
}