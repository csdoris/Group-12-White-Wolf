/**
 * This is a simple RESTful API for dealing with plans.
 */

 import express from 'express';
 import {
     createPlan,
     retrievePlan,
     retrievePlanList,
     updatePlan,
     deletePlan
 } from '../../plans-data/plans-dao';
 
 // const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 
 const router = express.Router();
 
 router.use(middleware?)

 // Create new plan
 router.post('/', async (req, res) => {
     const newPlan = await createPlan({
         name: req.body.name,
         events: req.body.events,
     });
 
     res.status(HTTP_CREATED)
         .header('Location', `/api/plans/${newPlan._id}`)
         .json(newPlan);
 })
 
 // Retrieve all plans
 router.get('/', async (req, res) => {
 
     // Uncomment the following code to introduce an artificial delay before the response
     // is sent back to the client.
     // setTimeout(() => {
     //     res.json(retrievePlanList());
     // }, 2000);
 
 
     // When introducing the artificial delay, also comment this line. It's an error to send
     // two responses.
     res.json(await retrievePlanList());
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
 
 // Update plan in case of name change and event change.
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
 
 export default router;