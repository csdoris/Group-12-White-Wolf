import routes from '../../../routes';
import express from 'express';
import axios from 'axios';

let app, server;
let breakfast1, breakfast2, breakfast3;

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
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 * 
 * Also, stop the express server
 */
afterAll( () => {
    server.close();
});

it('gets api key from the server', async () => {

    const response = await axios.get('http://localhost:3000/api/apikeys/googlekey');
    
    expect(response.data.googleAPIKey).toBe("googleMapKey");
});
