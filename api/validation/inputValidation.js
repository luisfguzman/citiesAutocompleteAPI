exports.inputValidation = function (q, latitude, longitude, radius) {
        //validate input

        if(!q) {
            const error = new Error('query term is missing');
            error.httpStatusCode = 400;
            throw error;
        }
    
        if(typeof latitude === 'number' && isNaN(latitude)) {
            const error = new Error('latitude is not a number');
            error.httpStatusCode = 400;
            throw error;
        }
    
        if(typeof longitude === 'number' && isNaN(longitude)) {
            const error = new Error('longitude is not a number');
            error.httpStatusCode = 400;
            throw error;
        }

        if(latitude < -90 || latitude > 90) {
            const error = new Error('latitude is outside range of -90 and 90 degrees');
            error.httpStatusCode = 400;
            throw error;
        }

        if(longitude < -180 || longitude > 180) {
            const error = new Error('longitude is outside range of -180 and 180 degrees');
            error.httpStatusCode = 400;
            throw error;
        }
    
        if(typeof radius === 'number' && isNaN(radius)) {
            const error = new Error('radius is not a number');
            error.httpStatusCode = 400;
            throw error;
        }

        if((latitude && !longitude) || (!latitude && longitude)) {
            const error = new Error('one part of the coordinates is missing');
            error.httpStatusCode = 400;
            throw error;
        }

        if(radius && (!latitude && !longitude)) {
            const error = new Error('radius provided but no coordinates present');
            error.httpStatusCode = 400;
            throw error;
        }
}