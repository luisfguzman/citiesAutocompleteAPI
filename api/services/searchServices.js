exports.registerSearchServices = function (app) {
    const levenshtein = require('liblevenshtein');
    const citiesData = require('../../public/data/cities_canada-usa.json');
    app.locals.citiesData = citiesData;

    const cityNames = citiesData.map(function (a) { return a.ascii; });

    const builder = new levenshtein.Builder()
        .dictionary(cityNames, false)       // generate spelling candidates from unsorted completion_list
        .algorithm("transposition")         // use Levenshtein distance extended with transposition
        .sort_candidates(true)              // sort the spelling candidates before returning them
        .case_insensitive_sort(true)        // ignore character-casing while sorting terms
        .include_distance(true)            // just return the ordered terms (drop the distances)
        .maximum_candidates(10);
 
    const transducer = builder.build();
    app.locals.transducer = transducer;
}

// function for dynamic sorting
exports.compareValues = function(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    };
}

exports.calculateSearchScore = function(dist, liblevenshteinDist) {
    let score = 1 - (liblevenshteinDist * 0.1);

    if(dist) {
        if(dist > 200 && dist <= 300)
            score = score - 0.1;
        if(dist > 300 && dist <= 400)
            score = score - 0.2;
        if(dist > 400 && dist <= 500)
            score = score - 0.3;
        if(dist > 500 && dist <= 1000)
            score = score - 0.4;
        if(dist > 1000)
            score = score - 0.5;
    }

    return Math.round(score * 10) / 10;
}