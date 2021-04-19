import dayjs from 'dayjs';
import { Plan } from './schema';

async function createPlan(plan) {

    const dbPlan = new Plan(plan);
    await dbPlan.save();
    return dbPlan;
}

async function retrievePlanList() {
    return await Plan.find();
}

async function retrievePlan(id) {
    return await Plan.findById(id);
}

async function updatePlan(plan) {

    const dbPlan = await Plan.findById(plan._id);
    if (dbPlan) {
        
        dbPlan.name = plan.name;
        dbPlan.events = plan.events;

        await dbPlan.save();
        return true;
    }

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