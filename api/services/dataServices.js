exports.populateCityData = function(results, req) {
    let cityDataArray = [];

    for (const s of results) {
        let city = req.app.locals.citiesData.find(o => o.name === s);
        city = (({ name, lat, long }) => ({ name, lat, long }))(city);
        city.score = 0.0;
        cityDataArray.push(city);
    }

    return cityDataArray;
}