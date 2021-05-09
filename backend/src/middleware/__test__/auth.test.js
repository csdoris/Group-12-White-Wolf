import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User } from '../../database/schema';
import auth from '../auth';
import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken');


let mongod;

// Set up database documents
const user = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000001'),
    name: "Bob",
    password: "pass",
    email: "bob@gmail.com",
};

const user2 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000002'),
    name: "Alice",
    password: "pass",
    email: "alice@gmail.com",
    plans: [new mongoose.mongo.ObjectId('000000000000000000000005')]
};

const mockRequest = (token, bodyContent) => ({
    headers: { authorization: `Bearer ${token}` },
    body: bodyContent
});

const mockResponse = () => {
    const res = {};
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const nextFunction = jest.fn();
/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 * 
 */
beforeAll(async () => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
    jest.spyOn(jwt, 'verify');
    // Add user to database
    await User.create(user);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    jwt.verify.mockRestore();
    await User.deleteMany();
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it('successfully authenticate user with token', async () => {
    jwt.verify.mockReturnValue({ userId: user._id });

    const req = mockRequest(user._id, {});
    const res = mockResponse();
    await auth(req, res, nextFunction);

    expect(req.body.user_id).toEqual(user._id);
    expect(nextFunction).toBeCalledTimes(1);
    expect(jwt.verify.mock.calls[0][0].toString()).toEqual(user._id.toString());
    expect(jwt.verify.mock.calls[0][1]).toBe('secretKey');
});

it('fails with no token provided', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await auth(req, res, nextFunction);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
});

it('fails with non existant token provided', async () => {
    const req = mockRequest(user2._id);
    const res = mockResponse();
    await auth(req, res, nextFunction);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
});



