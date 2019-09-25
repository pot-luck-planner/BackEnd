const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  invite,
  findInvites,
  updateInvite,
  addFood,
  getFood,
  foodItem,
  myInvites,
  updateEvent,
  deleteEvent,
  findEventById
};

//Get your hosted events
function find(id) {
  return db('events')
    .select()
    .where({ host_id: id })
}

//Add an event
async function add(event) {
  const [id] = await db('events').insert(event, 'id');
  return findEventById(id);
}

//Get event by id
function findEventById(id) {
      return db('events')
        .where({ id })
        .first();
}

//Get invites by event_id
function findInvites(id) {
  return db('invites as i')
    .innerJoin('accounts as a', 'i.account_id', '=', 'a.id')
    .innerJoin('events as e', 'i.event_id', '=', 'e.id')
    .select('i.event_id', 'e.name', 'i.account_id', 'a.username', 'a.firstname', 'a.lastname', 'i.food', 'i.notes', 'i.rsvp')
    .where({ event_id: id })
}

//Add invites to event
async function invite(invites) {
  const [] = await db('invites').insert(invites)
  return invites;
}

//Add food to event
async function addFood(food) {
  const [] = await db('food').insert(food)
  return food;
}

//Get food by event_id
function getFood(id) {
  return db('food')
  .select()
  .where({ event_id: id })
}

//Get a food by its id
function foodItem(id) {
  return db('food')
  .select()
  .where({ id })
}

//Get events you're invited to
function myInvites(id) {
  return db('invites as i')
    .innerJoin('accounts as a', 'i.account_id', '=', 'a.id')
    .innerJoin('events as e', 'i.event_id', '=', 'e.id')
    .select('i.event_id', 'e.name', 'e.date', 'e.time', 'e.location', 'e.host_id', 'e.host_name as host', 'i.account_id', 'a.username', 'a.firstname', 'a.lastname', 'i.food', 'i.notes', 'i.rsvp')
    .where({ account_id: id} )
}
 
//Update invites
async function updateInvite(changes, id) {
  await db('invites')
    .update(changes)
    .where({ id });

  return changes
}

//Update event
async function updateEvent(changes, id) {
    await db('events')
      .update(changes)
      .where({ id });

      return findEventById(id);
}

//Delete event
function deleteEvent(id) {
    return db('events')
      .del()
      .where({ id });
}