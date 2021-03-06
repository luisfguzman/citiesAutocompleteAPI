# Cities Autocomplete API

##  REST API endpoint that provides auto-complete suggestions for large cities in Canada and USA.

### https://safe-meadow-16860.herokuapp.com/

- The endpoint is exposed at `/suggestions`
- The partial (or complete) search term is passed as a querystring parameter `q`
- The caller's location can optionally be supplied via querystring parameters `latitude` and `longitude` to help improve relative scores
- The caller can optionally supply a querystring parameter `radius` in Kilometers to narrow down results
- The endpoint returns a JSON response with an array of scored suggested matches
    - The suggestions are sorted by descending score
    - Each suggestion has a score between 0 and 1 (inclusive) indicating confidence in the suggestion (1 is most confident)
    - Each suggestion has a name which can be used to disambiguate between similarly named locations
    - Each suggestion has a latitude and longitude

## Sample responses

These responses are meant to provide guidance.

**Near match**

    https://safe-meadow-16860.herokuapp.com/suggestions?q=Londo&latitude=43.70011&longitude=-79.4163&radius=600

```json
{
    "suggestions": [
        {
            "name": "London, ON, Canada",
            "latitude": 42.98339,
            "longitude": -81.23304,
            "score": 0.9
        },
        {
            "name": "London, OH, USA",
            "latitude": 39.88645,
            "longitude": -83.44825,
            "score": 0.5
        },
        {
            "name": "Lodi, NJ, USA",
            "latitude": 40.88232,
            "longitude": -74.0832,
            "score": 0.4
        },
        {
            "name": "Lyndon, VT, USA",
            "latitude": 44.51422,
            "longitude": -72.01093,
            "score": 0.4
        }
    ]
}
```

**No match**

    GET https://safe-meadow-16860.herokuapp.com/suggestions?q=SomeRandomCityInTheMiddleOfNowhere

```json
{
  "suggestions": []
}
```

## References

- Geonames provides city lists Canada and the USA http://download.geonames.org/export/dump/readme.txt
- liblevenshtein - A library for generating Finite State Transducers based on Levenshtein Automata https://github.com/universal-automata/liblevenshtein
- Movable Type Scripts - Calculate distance, bearing and more between Latitude/Longitude points https://www.movable-type.co.uk/scripts/latlong.html