const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  invite,
  findInvites,
  myInvites,
  updateEvent,
  deleteEvent
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
    
function findEventById(id) {
      return db('events')
        .where({ id })
        .first();
}

function findInvites() {
  return db('attendees')
    .select()
}

//Add invites to event
async function invite(invites) {
  const [] = await db('attendees').insert(invites)
  return findInvites();
}

//Get my invites
function myInvites(id) {
  return db('attendees')
  .select()
  .where({ account_id: id })
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

// Get list of food at potluck

function getFood(id) {
  return db('foods')
    .where({ "event_id": id })
}

function addFoodItem(item) {
  return db('foods')
    .insert(item)
}

function updateFoodItem(changes, id) {
  return db('foods')
    .update(changes)
    .where({ id });
}

function deleteFoodItem(id) {
  return db('foods')
    .where({ id })
    .del()
}

