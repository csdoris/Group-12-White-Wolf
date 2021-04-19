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

        dbPlan.title = plan.title;
        dbPlan.date = dayjs(plan.date).toDate();
        dbPlan.content = plan.content;
        dbPlan.image = plan.image;

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