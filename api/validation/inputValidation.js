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
}