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

//Add new event
router.post('/', authenticate, (req, res) => {
  let event = req.body;
  let host_id = req.account.id;
  let host_name = req.account.username;
  Events.add({ ...event, host_id, host_name })
      .then(newEvent => {
              res.status(200).json(newEvent);
          })
          .catch(err => {
              res.status(500).json(err);
          });
});

//Get all invites
router.get('/invites', (req, res) => {
    Events.findInvites()
        .then(invites => {
            res.json(invites)
        })
        .catch(err => res.send(err))
})

//Get my your invites
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
    let host_id = req.account.id;
    Events.invite({...invite, event_id})
        .then(invites => {
            if(host_id) { //req.accounts is undefined. Changed to a check for presence of host_id.
            res.status(200).json(invites);
            }else{
                console.log(host_id, req.account.id, req.accounts)
                res.status(401).json({ message: 'Invalid Credentials' });   
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

//Update an event
router.put('/:id', authenticate, (req, res) => {
    console.log(req.params, req.account)
    let body = req.body;
    let id = req.params.id;
    Events.updateEvent(body, id)
        .then(updatedEvent => {
            if (host_id  === req.account.id) {
                res.status(200).json(updatedEvent);
                }else{
                    res.status(401).json({ message: 'Invalid Credentials' }); 
                }
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
            if (host_id  === req.account.username) {
                res.status(200).json(deleted);
                }else{
                    res.status(401).json({ message: 'Invalid Credentials' }); 
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
})

module.exports = router;