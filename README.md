# Potluck Planner Backend

## Installation

```bash
npm install
```
## Usage

```bash
npm run server || nodemon
```

## Author

Jonathon Green

## Tables

### Accounts Table

accounts.increments();
accounts.string('firstname', 128).notNullable();
accounts.string('lastname', 128).notNullable();
accounts
  .string('username', 128)
  .notNullable()
  .unique();
accounts.string('password', 128).notNullable();

### Events Table

events.increments()
events.string('name', 500).notNullable();
events
  .integer('host_id')
  .unsigned()
  .references('id')
  .inTable('accounts')
  .onUpdate('CASCADE')
  .onDelete('CASCADE');
events
  .string('host_name') 
  .unsigned()
  .references('username')
  .inTable('accounts')
  .onUpdate('CASCADE')
  .onDelete('CASCADE'); 
events.string('date', 128).notNullable().defaultTo('TBD');
events.string('time', 128).notNullable().defaultTo('TBD');
events.string('location', 500).notNullable().defaultTo('TBD');

### Invites Table

invites.increments();
invites
  .integer('event_id')
  .unsigned()
  .references('id')
  .inTable('events')
  .onUpdate('CASCADE')
  .onDelete('CASCADE');
invites
  .integer('account_id')
  .unsigned()
  .references('id')
  .inTable('accounts')
  .onUpdate('CASCADE')
  .onDelete('CASCADE');
invites.string('food', 500).notNullable().defaultTo('TBD');
invites.boolean('rsvp').notNullable().defaultTo(false);
invites.text('notes', 2000);

### Food Tables

food.increments();
food
  .integer('event_id')
  .unsigned()
  .references('id')
  .inTable('events')
  .onUpdate('CASCADE')
  .onDelete('CASCADE');
food.string('name').notNullable();
food.string('food_qty', 128);
food.string('category', 128);

## Endpoints

### Base Url

https://potluck-planner-v2.herokuapp.com/

### Account-Routes

##### POST https://potluck-planner-v2.herokuapp.com/accounts/register

Here you will find the documentation and resources for the Potluck Planner Backend Node server. 

## Endpoints

### [Click this link for the list of endpoints and how to use them!](https://docs.google.com/document/d/1ZAGspcgEKSvwzJ7wTOKF_97kW1xaKpER7XVd8HG9NkU/edit?usp=sharing "Click me!!!!!!")

---

Database design (WIP): <https://docs.google.com/spreadsheets/d/1oV57Zhx2LFWPCgU77jBBC3DTM9ofsY4b-Q3MZUrKdbo/edit?usp=sharing>
