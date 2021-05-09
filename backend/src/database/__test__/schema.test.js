import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {User, Plan} from '../schema';
import { retrieveUserById } from '../user-dao';

let mongod;

const user = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000001'),
    name: "Bob",
    email: "bob@gmail.com",
    plans: [new mongoose.mongo.ObjectId('000000000000000000000002')]
    
};
const plan = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000002'),
    name: "Plan",
    events: []
    
};

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    
    await User.create(user);
    await Plan.create(plan);

});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.db.dropCollection('plans');
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it('gets a single user by id', async () => {
    const dbUser = await retrieveUserById(user._id);
    expect(dbUser.name).toBe("Bob");
    expect(dbUser.email).toBe("bob@gmail.com");
    expect(dbUser.plans[0].toString()).toBe(plan._id.toString());
});

it('gets a single user by email', async () => {
    const dbUser = await User.findOne({email: user.email});
    expect(dbUser.name).toBe("Bob");
    expect(dbUser.email).toBe("bob@gmail.com");
    expect(dbUser.plans[0].toString()).toBe(plan._id.toString());
});

it('retrieve all plans for a user', async () => {
    const dbUser = await User.findById(user._id);
    expect(dbUser.name).toBe("Bob");
    expect(dbUser.email).toBe("bob@gmail.com");
    expect(dbUser.plans[0].toString()).toBe(plan._id.toString());
});

it('adds a plan without crashing', async () => {
    const newPlan = new Plan({
        name: "new plan"
    });

    await newPlan.save();

    const fromDb = await mongoose.connection.db.collection('plans').findOne({ _id: newPlan._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.name).toBe('new plan');
    expect(fromDb.events.length).toBe(0);
});

it('adds an event without crashing', async () => {
    const newEvent = {
        name: "new event",
        startTime: new Date('2021-05-06T09:00:00'),
        endTime: new Date('2021-05-06T10:00:00'),
        address: "1 ABC street",
        lat: "123",
        lng: "456"

    };

    await Plan.findByIdAndUpdate(plan._id, { $push: { events: newEvent }},{new:true});

    const fromDb = await mongoose.connection.db.collection('plans').findOne({ _id: plan._id });
    expect(fromDb).toBeTruthy();
    expect(fromDb.name).toBe('Plan');
    expect(fromDb.events.length).toBe(1);
    expect(fromDb.events[0].name).toBe("new event");
});


