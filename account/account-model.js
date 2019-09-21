const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db('accounts')
    .select('id', 'username', 'firstname', 'lastname')
}

// function find(id) {
//     return db('events as ev')
//       .innerJoin('accounts', 'ev.host_id', '=', 'accounts.id')
//       .select('accounts.id as account_id', 'accounts.username', 'accounts.firstname', 'accounts.lastname', 'ev.id as event_id', 'ev.name', 'ev.date', 'ev.time', 'ev.location', 'accounts.firstname as host')
//       .where({ host_id: id }) 
// }

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