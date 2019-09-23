const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

const Accounts = require('./account-model.js');
const authenticate = require('../auth/authenticate-middleware.js');

router.get('/', authenticate, (req, res) => {
  console.log(req.account.id)
  Accounts.find(req.account.id)  
    .then(accounts => {
        res.json(accounts);
    })
    .catch(err => res.send(err));
});

router.get('/users', authenticate, (req, res) => {
  Accounts.findUsers()  
    .then(accounts => {
        res.json(accounts);
    })
    .catch(err => res.send(err));
});

router.post('/register', (req, res) => {
    let account = req.body;
    const hash = bcrypt.hashSync(account.password, 16);
    account.password = hash;
  
    Accounts.add(account)
      .then(account => {
        const token = generateToken(account);  
        res.status(200).json({ message: `Welcome to Potluck Planner ${account.firstname}!`, token });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Accounts.findBy({ username })
      .first()
      .then(account => {
        if (account && bcrypt.compareSync(password, account.password)) {
          const token = generateToken(account);
          res.status(200).json({ message: `Welcome back ${account.firstname}`, token });
        } else {
          res.status(401).json({ message: 'Username or password incorrect' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

//Update an account
router.put('/:id', authenticate, (req, res) => {
  console.log(req.params, req.account.id)
  let body = req.body;
  let id = req.params.id;
  Accounts.update(body, id)
      .then(updated => {
          // if (username  === req.account.username) {
              res.status(200).json({message: 'Update Successful', updated});
              // }else{
              //     res.status(401).json({ message: 'Invalid Credentials' }); 
              // }
          })
          .catch(err => {
              res.status(500).json(err);
          });
})

function generateToken(account) {
    const payload = {
      id: account.id,
      username: account.username
    };
    const options = {
      expiresIn: '1d',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;