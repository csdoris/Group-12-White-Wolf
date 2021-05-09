import { Plan, User } from './schema';

async function createPlan(userId, plan) {

    const dbPlan = new Plan(plan);
    await dbPlan.save();
    try {
        await User.findByIdAndUpdate(userId,{ $push: {plans: dbPlan._id}})
    } catch (err) {
        console.log(err);
    }
    return dbPlan;
}

// Returns list of plans with their id and name only for a particular user
async function retrievePlanList(userId) {
    const dbUser = await User.findById(userId);
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

async function deletePlan(userId, planId) {
    await Plan.deleteOne({ _id: planId });
    try {
        await User.findByIdAndUpdate(userId,{ $pull: {plans: planId}})
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
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

async function isValidPlanForUser(userId, planId) {
    const user = await User.findById(userId);
    if (user.plans.includes(planId)){
        return true;
    } 
    return false;
}

export {
    createPlan,
    retrievePlan,
    retrievePlanList,
    updatePlan,
    deletePlan,
    createEvent,
    updateEvent,
    deleteEvent,
    isValidPlanForUser
}