import routes from '../../../routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import auth from '..//../../middleware/auth'
import { User } from '../../../database/schema';
jest.mock('..//../../middleware/auth');

let mongod, app, server;

const header = {
    headers: {
        "Authorization": `Bearer authToken`
    }
}

const user = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000001'),
    name: "Bob",
    password: "pass",
    email: "bob@gmail.com"
};

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

    app = express();
    app.use(express.json());
    app.use('/', routes);
    server = app.listen(3000, () => done());
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    await User.create(user);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await User.deleteMany();
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 * 
 * Also, stop the express server
 */
afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();

        done();
    });
});

it('retrieves a user infomation successfully', async () => {
    auth.mockImplementation(async (req, res, next) => {
        req.body.user_id = user._id;
        next();
    });

    const response = await axios.get('http://localhost:3000/api/user', header);
    const body = response.data;

    expect(response.status).toBe(200);
    expect(body.name).toBe("Bob");
    expect(body.email).toBe("bob@gmail.com");

});

// Test to check auth returns 401 
it('fails to retrieve user infomation due to authentication', async () => {
    try {
        await axios.get('http://localhost:3000/api/user', header);
    } catch (err) {
        const { response } = err;
        expect(response.status).toBe(401);
    }
});