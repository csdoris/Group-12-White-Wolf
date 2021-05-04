import { Plan, User } from './schema';

async function createPlan(user_id, plan) {

    const dbPlan = new Plan(plan);
    await dbPlan.save();
    User.findByIdAndUpdate(user_id,{ $push: {plans: dbPlan._id}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
    return dbPlan;
}

// Returns list of plans with their id and name only for a particular user
async function retrievePlanList(user_id) {
    const dbUser = await User.findById(user_id);
    return await Plan.find({'_id': { $in: dbUser.plans} },'name');
}

async function retrievePlan(id) {
    return await Plan.findById(id);
}

// Updates only the name
async function updatePlan(plan) {
    try {
        await Plan.findByIdAndUpdate(plan._id, { name: plan.name});    
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function deletePlan(id) {
    await Plan.deleteOne({ _id: id });
}


async function createEvent(planId, event) {
    return await Plan.findByIdAndUpdate(planId, { $push: { events: event }},{new:true});
}

async function updateEvent(planId,eventId, event) {
    try {
        await Plan.findOneAndUpdate({"_id": planId, "events._id": eventId},{ $set: { "events.$": event }},{new:true});
        return true;
    } catch (err ){
        console.log(err);
        return false;
    }
}

async function deleteEvent(planId,eventId) {
    try {
        await Plan.findByIdAndUpdate(planId,{ $pull: { events : {_id: eventId}}});
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export {
    createPlan,
    retrievePlan,
    retrievePlanList,
    updatePlan,
    deletePlan,
    createEvent,
    updateEvent,
    deleteEvent
}