module.exports = function (app) {
    const levenshtein = require('liblevenshtein');
    const citiesData = require('../../public/data/cities_canada-usa.json');
    app.locals.citiesData = citiesData;

    const cityNames = citiesData.map(function (a) { return a.name; });

    const builder = new levenshtein.Builder()
        .dictionary(cityNames, false)       // generate spelling candidates from unsorted completion_list
        .algorithm("transposition")         // use Levenshtein distance extended with transposition
        .sort_candidates(true)              // sort the spelling candidates before returning them
        .case_insensitive_sort(true)        // ignore character-casing while sorting terms
        .include_distance(false)            // just return the ordered terms (drop the distances)
        .maximum_candidates(10);
 
    const transducer = builder.build();
    app.locals.transducer = transducer;
}