import routes from '../../../routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import axios from 'axios';
import auth from '..//../../middleware/auth'
import { User, Plan } from '../../../database/schema';
jest.mock('..//../../middleware/auth');


let mongod, app, server;

// Set up database documents
const user1 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000001'),
    name: "Bob",
    password: "pass",
    email: "bob@gmail.com",
    plans: [new mongoose.mongo.ObjectId('000000000000000000000003'), new mongoose.mongo.ObjectId('000000000000000000000004')]
};

const user2 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000002'),
    name: "Alice",
    password: "pass",
    email: "alice@gmail.com",
    plans: [new mongoose.mongo.ObjectId('000000000000000000000005')]
};

const event1 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000006'),
    name: "event1",
    startTime: new Date(2021, 7, 1, 14).toJSON(),
    endTime: new Date(2021, 7, 2, 15).toJSON(),
    address: "1 ABC street",
    lat: 100,
    lng: 200
}

const event2 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000007'),
    name: "event2",
    startTime: new Date(2021, 6, 1, 12).toJSON(),
    endTime: new Date(2021, 6, 1, 13).toJSON(),
    address: "26 XYZ street",
    lat: 300,
    lng: 400
}

const planWithEvent1 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000003'),
    name: "planWithEvent1",
    events: [event1]
}

const planWithEvent2 = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000004'),
    name: "planWithEvent2",
    events: [event2]
}

const planWithoutEvent = {
    _id: new mongoose.mongo.ObjectId('000000000000000000000005'),
    name: "planWithoutEvent"
}

// Entries for adding and updating
const planToAdd = {
    name: "Added Plan"
}

const updatedPlan = {
    name: "Updated"
}

const eventToAdd = {
    name: "Add event",
    startTime: "2021-05-06T03:00",
    endTime: "2021-05-06T04:00",
    address: "1 ABC street",
    lat: 100,
    lng: 200
}

const eventToUpdate = {
    name: "Update event name",
    startTime: new Date(2021, 7, 1, 14).toJSON(),
    endTime: new Date(2021, 7, 2, 15).toJSON(),
    address: "1 updated street",
    lat: 100,
    lng: 200
}

function header(id) {
    return {
        headers: {
            "Authorization": `Bearer ${id}`
        }

    }
};

// Mock the auth middleware to have the auth token be the user id
auth.mockImplementation(async (req, res, next) => {
    req.body.user_id = req.headers.authorization.split(' ')[1];
    next();
});

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

beforeEach(async () => {
    // Add user to database
    await User.create([user1, user2]);
    await Plan.create([planWithEvent1, planWithEvent2, planWithoutEvent]);

});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
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

describe('success operations', () => {

    it('GET /plans: retrieve all plans successfully', async () => {

        const response = await axios.get('http://localhost:3000/api/plans', header(user1._id));
        const plans = response.data;

        expect(response.status).toBe(200);
        expect(plans.length).toBe(2);

        expect(plans[0]._id).toBe("000000000000000000000003");
        expect(plans[0].name).toBe("planWithEvent1");

        expect(plans[1]._id).toBe("000000000000000000000004");
        expect(plans[1].name).toBe("planWithEvent2");

    });

    it('GET /plans: retrieve a single plans successfully', async () => {

        const response = await axios.get(`http://localhost:3000/api/plans/${planWithEvent1._id}`, header(user1._id));
        const plan = response.data;

        expect(response.status).toBe(200);
        expect(plan._id).toBe("000000000000000000000003");
        expect(plan.name).toBe("planWithEvent1");
        expect(plan.events[0]._id).toBe("000000000000000000000006");
        expect(plan.events[0].name).toBe("event1");
        expect(plan.events[0].address).toBe("1 ABC street");
        expect(plan.events[0].startTime).toBe(new Date(2021, 7, 1, 14).toJSON());
        expect(plan.events[0].endTime).toBe(new Date(2021, 7, 2, 15).toJSON());
        expect(plan.events[0].lat).toBe("100");
        expect(plan.events[0].lng).toBe("200");
    });

    it('POST /plans: add a plan successfully', async () => {
        
        const response = await axios.post('http://localhost:3000/api/plans', planToAdd, header(user1._id));
        const newPlan = response.data;

        expect(response.status).toBe(201);
        expect(newPlan.name).toBe("Added Plan");

        const dbUser1 = await User.findById(user1._id);
        const dbUser2 = await User.findById(user2._id);

        if (!dbUser1.plans.includes(newPlan._id)) {
            fail("Plan object id isn't added to user")
        } else if (dbUser2.plans.includes(newPlan._id)) {
            // Check the plan isn't added to all the users
            fail("Plan added to wrong user")
        }
    });

    it('PUT /plans/{:id}: update a plan successfully', async () => {

        const response = await axios.put(`http://localhost:3000/api/plans/${planWithEvent1._id}`, updatedPlan, header(user1._id));
        expect(response.status).toBe(204);

        const plan = await Plan.findById(planWithEvent1._id);
        expect(plan.name).toBe("Updated");

    });

    it('DELETE /plans/{:id}: delete a plan successfully', async () => {

        const response = await axios.delete(`http://localhost:3000/api/plans/${planWithEvent1._id}`, header(user1._id));
        expect(response.status).toBe(204);

        const plan = await Plan.findById(planWithEvent1._id);

        if (plan) {
            fail("Plan should be deleted")
        } else {
            const user = await User.findById(user1._id);
            if (user.plans.includes(planWithEvent1._id)) {
                console.log(user)
                fail("Plan should be deleted for the user")
            }
        }
    });

    it('POST /plans/{:planid}: add an event successfully', async () => {
        
        const response = await axios.post(`http://localhost:3000/api/plans/${planWithEvent1._id}`, eventToAdd, header(user1._id));
        const plan = response.data;

        expect(response.status).toBe(201);
        expect(plan.name).toBe("planWithEvent1");
        expect(plan.events.length).toBe(2);
        expect(plan.events[0].name).toBe("event1");
        expect(plan.events[1].name).toBe("Add event");
    });

    it('PUT /plans/{:planid}/{:eventid}: update an event successfully', async () => {

        const response = await axios.put(`http://localhost:3000/api/plans/${planWithEvent1._id}/${event1._id}`, eventToUpdate, header(user1._id));

        expect(response.status).toBe(204);
        const plan = await Plan.findById(planWithEvent1._id);

        expect(plan.events.length).toBe(1);
        expect(plan.events[0].name).toBe("Update event name");
        expect(plan.events[0].startTime.toJSON()).toBe(new Date(2021, 7, 1, 14).toJSON());
        expect(plan.events[0].endTime.toJSON()).toBe(new Date(2021, 7, 2, 15).toJSON());
        expect(plan.events[0].address).toBe("1 updated street");
        expect(plan.events[0].lat).toBe("100");
        expect(plan.events[0].lng).toBe("200");
    });

    it('DELETE /plans/{:planid}/{:eventid}: delete an event successfully', async () => {

        const response = await axios.delete(`http://localhost:3000/api/plans/${planWithEvent1._id}/${event1._id}`, header(user1._id));
        expect(response.status).toBe(204);
        const plan = await Plan.findById(planWithEvent1._id);

        expect(plan.events.length).toBe(0);
    });
});

describe('fail operations', () => {

    it('PUT /plans/{:id}: fails due to wrong user', async () => {
        try {
            await axios.put(`http://localhost:3000/api/plans/${planWithEvent1._id}`, updatedPlan ,header(user2._id));
            fail('Should have thrown an exception.');

        } catch (err) {
            const { response } = err;
            expect(response.status).toBe(404);

            const plan = await Plan.findById(planWithEvent1._id)
            
            // Plan should not be updated
            expect(plan._id.toString()).toBe("000000000000000000000003");
            expect(plan.name).toBe("planWithEvent1");
            expect(plan.events[0]._id.toString()).toBe("000000000000000000000006");
            expect(plan.events[0].name).toBe("event1");
            expect(plan.events[0].address).toBe("1 ABC street");
            expect(plan.events[0].startTime.toJSON()).toBe(new Date(2021, 7, 1, 14).toJSON());
            expect(plan.events[0].endTime.toJSON()).toBe(new Date(2021, 7, 2, 15).toJSON());
            expect(plan.events[0].lat).toBe("100");
            expect(plan.events[0].lng).toBe("200");
        }
    });

    it('DELETE /plans/{:id}: fails due to wrong user', async () => {
        try {
            await axios.delete(`http://localhost:3000/api/plans/${planWithEvent1._id}`, header(user2._id));
            fail('Should have thrown an exception.');

        } catch (err) {
            const { response } = err;
            expect(response.status).toBe(404);

            const plan = await Plan.findById(planWithEvent1._id);

            if (!plan) {
                fail("Plan should not be deleted")
            } else {
                const user = await User.findById(user1._id);
                if (!user.plans.includes(planWithEvent1._id)) {
                    fail("Plan should not be deleted for the user")
                }
            }
        }
    });
});
