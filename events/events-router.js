const router = require('express').Router();

const Events = require('./events-model.js');
const authenticate = require('../auth/authenticate-middleware.js');

//Get your hosted events
router.get('/', authenticate, (req, res) => {
  Events.find(req.account.id)  
    .then(accounts => {
        res.json(accounts);
    })
    .catch(err => res.send(err));
});

//Get events by id
router.get('/:id', (req, res) => {
    Events.findEventById(req.params.id)
        .then(accounts => {
            res.json(accounts);
        })
        .catch(err => res.send(err))
})

//Add new event
router.post('/', authenticate, (req, res) => {
  let event = req.body;
  let host_id = req.account.id;
  let host_name = req.account.username;
  Events.add({ ...event, host_id, host_name })
      .then(newEvent => {
              res.status(200).json({ message: 'Successfully added event', newEvent});
          })
          .catch(err => {
              res.status(500).json(err);
          });
});

//Get all invites by event id
router.get('/:id/invites', (req, res) => {
    let id = req.params.id
    Events.findInvites(id)
        .then(invites => {
            res.json(invites)
        })
        .catch(err => res.send(err))
})

//Get events you're invited to
router.get('/invites/:id', authenticate, (req, res) => {
    console.log(req.params.id, req.account.id)
    Events.myInvites(req.account.id)
        .then(invites => {
                res.status(200).json({ invites: invites });
            })
            .catch(err => {
                res.status(500).json(err);
            });
})

//Add guest invites
router.post('/:id/invites', authenticate, (req, res) => {
    let invite  = req.body;
    let event_id = req.params.id;
    Events.invite({...invite, event_id})
        .then(invites => {
            res.status(200).json({ message: 'Successfully created invite', invites });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//Add food for event
router.post('/:id/food', authenticate, (req, res) => {
    let body = req.body;
    let event_id = req.params.id;
    Events.addFood({...body, event_id})
        .then(food => {
            res.status(200).json({ message: 'Successfully added item', food })
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

//Get list of food by event id
router.get('/:id/food', authenticate, (req, res) => {
    Events.getFood(req.params.id)
    .then(food => {
        res.json(food);
    })
    .catch(err => res.send(err));
})

//Get food item by id
router.get('/food/:id', (req, res) => {
    Events.foodItem(req.params.id)
    .then(item => {
        res.json(item);
    })
    .catch(err => res.send(err));
})

//Update an invite
router.put('/:id/invites', authenticate, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    Events.updateInvite(body, id)
        .then(updatedInvite => {
                res.status(200).json({ message: 'Successfully updated invite' ,updatedInvite });
            })
            .catch(err => {
                res.status(500).json(err);
            });
})

//Update an event
router.put('/:id', authenticate, (req, res) => {
    console.log(req.params, req.account)
    let body = req.body;
    let id = req.params.id;
    Events.updateEvent(body, id)
        .then(updatedEvent => {
                res.status(200).json({ message: 'Successfully updated event' ,updatedEvent });
            })
            .catch(err => {
                res.status(500).json(err);
            });
})

//Delete an event
router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    Events.deleteEvent(id)
        .then(deleted => {
            if (host_id  === req.account.id) {
                res.status(200).json(deleted);
                }else{
                    res.status(401).json({ message: 'Invalid Credentials' }); 
                }
            })
            .catch(err => {
                res.status(500).json({ message: `Successfully deleted event with id - ${id}` });
            });
})

module.exports = router;