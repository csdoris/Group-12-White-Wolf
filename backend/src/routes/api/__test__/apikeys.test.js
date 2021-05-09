import routes from '../../../routes';
import express from 'express';
import axios from 'axios';

let app, server;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {

    app = express();
    app.use('/', routes);
    server = app.listen(3000, () => done());

});

/**
 * Stop the express server
 */
afterAll(done => {
    server.close(async () => {
        done();
    });
});

it('gets api key from the server', async () => {

    const response = await axios.get('http://localhost:3000/api/apikeys/googlekey');

    expect(response.data.googleAPIKey).toBe("googleMapKey");
});
