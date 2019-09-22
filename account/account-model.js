const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findUsers,
  findBy,
  findById,
  update
}; 

function findUsers() {
  return db('accounts')
    .select('id', 'username', 'firstname', 'lastname')
}

async function find(id) {
  
  const myAccount = await db('accounts')
     .select('id', 'username', 'firstname', 'lastname')
     .where({ id })
  const potlucks = await db('events as ev')
       .innerJoin('attendees', 'ev.id', '=', 'attendees.event_id')
       .select('ev.name', 'ev.date', 'ev.time', 'ev.location', 'ev.host_name as host')
       .where({ account_id: id })
   return [ { myAccount }, { potlucks } ]
}

function findBy(filter) {
  return db('accounts').where(filter);
}

async function add(account) {
  const [id] = await db('accounts').insert(account, 'id');

  return findById(id);
}

function findById(id) {
  return db('accounts')
    .where({ id })
    .first();
}

async function update(changes, id) {
    await db('accounts')
      .update(changes)
      .where({ id });

      return findById(id);
}