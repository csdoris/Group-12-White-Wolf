import { Plan } from './schema';

async function createPlan(plan) {

    const dbPlan = new Plan(plan);
    await dbPlan.save();
    return dbPlan;
}

// Returns list of plans with their id and name only
async function retrievePlanList() {
    return await Plan.find({},'name');
}

async function retrievePlan(id) {
    return await Plan.findById(id);
}

// A little sus, rewrites the entire plan, and needs the id to be supplied for the events
async function updatePlan(plan) {

    const dbPlan = await Plan.findById(plan._id);
    if (dbPlan) {
        
        dbPlan.name = plan.name;
        dbPlan.events = plan.events;

        await dbPlan.save();
        return true;
    }

//     Plan.findOneAndUpdate(id, newData,false, function(err, doc) {
//     if (err) return res.send(500, {error: err});
//     return res.send('Succesfully saved.');
// });

    return false;
}

async function deletePlan(id) {
    await Plan.deleteOne({ _id: id });
}

export {
    createPlan,
    retrievePlan,
    retrievePlanList,
    updatePlan,
    deletePlan
}