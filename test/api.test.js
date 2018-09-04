let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

const endpoint = '/suggestions?';
const term = 'Londo';
const latitude = 'latitude=43.70011';
const longitude = 'longitude=-79.4163';
const radius = 'radius=600';

describe('cities autocomplete RESTful API Tests', () => {

    describe('/GET no matches', () => {
        it('it should GET zero results back', (done) => {
            chai.request(server)
                .get(`${endpoint}q=SomeRandomCityInTheMiddleOfNowhere`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.suggestions.should.be.a('array');
                    res.body.suggestions.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET complete match', () => {
        it('it should GET 1 result back', (done) => {
            chai.request(server)
                .get(`${endpoint}q=London&${latitude}&${longitude}&radius=400`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.suggestions.should.be.a('array');
                    res.body.suggestions.length.should.be.eql(1);
                    res.body.suggestions[0].name.should.be.eql('London, ON, Canada');
                    res.body.suggestions[0].score.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/GET partial match', () => {
        it('it should GET 14 results back (no coordinates)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.suggestions.should.be.a('array');
                    res.body.suggestions.length.should.be.eql(14);
                    res.body.suggestions[0].name.should.be.eql('Hondo, TX, USA');
                    res.body.suggestions[0].score.should.be.eql(0.9);
                    done();
                });
        });

        it('it should GET 14 results back (with coordinates)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${latitude}&${longitude}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.suggestions.should.be.a('array');
                    res.body.suggestions.length.should.be.eql(14);
                    res.body.suggestions[0].name.should.be.eql('London, ON, Canada');
                    res.body.suggestions[0].score.should.be.eql(0.9);
                    done();
                });
        });

        it('it should GET 4 results back (with coordinates + radius)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${latitude}&${longitude}&${radius}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.suggestions.should.be.a('array');
                    res.body.suggestions.length.should.be.eql(4);
                    res.body.suggestions[0].name.should.be.eql('London, ON, Canada');
                    res.body.suggestions[0].score.should.be.eql(0.9);
                    done();
                });
        });
    });

    describe('/GET error validation/handling', () => {
        it('it should GET 404 url not found', (done) => {
            chai.request(server)
                .get(`/`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.url.should.be.a('string');
                    res.body.url.should.be.eql('/ not found');
                    done();
                });
        });

        it('it should GET 400 bad request (no search term)', (done) => {
            chai.request(server)
                .get(`${endpoint}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('query term is missing');
                    done();
                });
        });

        it('it should GET 400 bad request (lat NaN)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&latitude=abc123`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('latitude is not a number');
                    done();
                });
        });

        it('it should GET 400 bad request (long NaN)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${latitude}&longitude=abc123`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('longitude is not a number');
                    done();
                });
        });

        it('it should GET 400 bad request (lat outside range [-90,90])', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&latitude=-91&${longitude}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('latitude is outside range of -90 and 90 degrees');
                    done();
                });
        });

        it('it should GET 400 bad request (long outside range [-180,180])', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${latitude}&longitude=181`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('longitude is outside range of -180 and 180 degrees');
                    done();
                });
        });

        it('it should GET 400 bad request (radius NaN)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${latitude}&${longitude}&radius=abc123`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('radius is not a number');
                    done();
                });
        });

        it('it should GET 400 bad request (coordinate missing)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${latitude}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('one part of the coordinates is missing');
                    done();
                });
        });

        it('it should GET 400 bad request (radius but coordinates missing)', (done) => {
            chai.request(server)
                .get(`${endpoint}q=${term}&${radius}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.error.should.be.a('string');
                    res.body.error.should.be.eql('radius provided but no coordinates present');
                    done();
                });
        });
    });
});