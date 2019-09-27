const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findUsers,
  findBy,
  findById,
  update
}; 

//Get all users
function findUsers() {
  return db('accounts')
    .select('id', 'username', 'firstname', 'lastname')
}

//Get all your info and all events associated with you
async function find(id) {
  
  const myAccount = await db('accounts')
     .select('id', 'username', 'firstname', 'lastname')
     .where({ id })
  const potlucks = await db('events as ev')
       .innerJoin('invites as i', 'ev.id', '=', 'i.event_id')
       .innerJoin('accounts as a', 'ev.host_id', '=', 'a.id')
       .select('i.id as invite_id', 'ev.name', 'ev.id as event_id', 'a.firstname as host_fn', 'a.lastname as host_ln', 'ev.host_name as host_un', 'ev.date', 'ev.time', 'ev.location', 'i.food', 'i.rsvp', 'i.notes')
       .where({ account_id: id })
  const myEvents = await db('events')
       .select()
       .where({ host_id: id })
   return { myAccount,  myEvents,  potlucks } 
}

//Search for account by filter
function findBy(filter) {
  return db('accounts').where(filter);
}

//Register
async function add(account) {
  const [id] = await db('accounts').insert(account, 'id');

  return findById(id);
}

//Find account by id
function findById(id) {
  return db('accounts')
    .select('id', 'username', 'firstname', 'lastname')
    .where({ id })
    .first();
}

//Update your account
async function update(changes, id) {
    await db('accounts')
      .update(changes)
      .where({ id });

      return findById(id);
}