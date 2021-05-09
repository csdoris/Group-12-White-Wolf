import routes from '../../../routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import { User } from '../../../database/schema';

let mongod, app, server;
let dbUser;

const user = {
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
    // process.env.SECRET_KEY = "SECRET";
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    // Add user to database
    dbUser = await User.create(user);
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

it('gets token from server after successfully logging in', async () => {
    const body = {
        email: "bob@gmail.com",
        password: "pass"
    };
    const response = await axios.post('http://localhost:3000/api/login',body);
    
    expect(response.status).toBe(200);
    expect(response.data.token).toBeTruthy();
});

it('fails with incorrect user login details', async () => {
    const body = {
        email: "bob@gmail.com",
        password: "wrongpass"
    };
    
    try {
        await axios.post('http://localhost:3000/api/login',body);
        fail('Should have thrown an exception.');

    } catch (err) {
        const { response } = err;
        expect(response.status).toBe(401);
        expect(response.data.token).toBeUndefined();
    }
});

