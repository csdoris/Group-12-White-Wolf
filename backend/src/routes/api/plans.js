/**
 * This is a simple RESTful API for dealing with plans.
 */

 import express from 'express';
 import {
     createPlan,
     retrievePlan,
     retrievePlanList,
     updatePlan,
     deletePlan,
     createEvent,
     updateEvent,
     deleteEvent
 } from '../../database/plans-dao';
 
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 
 const router = express.Router();
 
 // Create new plan
 router.post('/', async (req, res) => {
     const newPlan = await createPlan(req.body.user_id, {
         name: req.body.name,
         events: req.body.events,
     });
 
     res.status(HTTP_CREATED)
         .header('Location', `/api/plans/${newPlan._id}`)
         .json(newPlan);
 })
 
 // Retrieve all plans
 router.get('/', async (req, res) => {    
     res.json(await retrievePlanList(req.body.user_id));
 });
 
 // Retrieve single plan
 router.get('/:id', async (req, res) => {
     const { id } = req.params;
 
     const plan = await retrievePlan(id);
 
     if (plan) {
         res.json(plan);
     }
     else {
         res.sendStatus(HTTP_NOT_FOUND);
     }
 });
 
 // Update plan in case of name change.
 router.put('/:id', async (req, res) => {
     const { id } = req.params;
     const plan = req.body;
     plan._id = id;
     const success = await updatePlan(plan);
     res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
 });
 
 // Delete plan
 router.delete('/:id', async (req, res) => {
     const { id } = req.params;
     await deletePlan(id);
     res.sendStatus(HTTP_NO_CONTENT);
 });
 
 // Creating event
 router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const event = req.body;
    const newPlan = await createEvent(id, event);

    res.status(HTTP_CREATED).json(newPlan);
});

// Update event
router.put('/:planId/:eventId', async (req, res) => {
    const { planId, eventId } = req.params;
    const event = req.body;
    event._id = eventId;
    const success = await updateEvent(planId, eventId, event);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
 });
 
 // Delete event
 router.delete('/:planId/:eventId', async (req, res) => {
    const { planId, eventId } = req.params;
    const success = await deleteEvent(planId, eventId);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
 });
 
 export default router;