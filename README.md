<h1 align="center">Potluck Planner - Backend</h1>

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

`accounts.increments();`<br />
`accounts.string('firstname', 128).notNullable();`<br />
`accounts.string('lastname', 128).notNullable();`<br />
`accounts`<br />
  `.string('username', 128)`<br />
  `.notNullable()`<br />
  `.unique();`<br />
`accounts.string('password', 128).notNullable();`<br />

### Events Table

`events.increments()`<br />
`events.string('name', 500).notNullable();`<br />
`events`<br />
  `.integer('host_id')`<br />
  `.unsigned()`<br />
  `.references('id')`<br />
  `.inTable('accounts')`<br />
  `.onUpdate('CASCADE')`<br />
  `.onDelete('CASCADE');`<br />
`events`<br />
  `.string('host_name')`<br />
  `.unsigned()`<br />
  `.references('username')`<br />
  `.inTable('accounts')`<br />
  `.onUpdate('CASCADE')`<br />
  `.onDelete('CASCADE');`<br />
`events.string('date', 128).notNullable().defaultTo('TBD');`<br />
`events.string('time', 128).notNullable().defaultTo('TBD');`<br />
`events.string('location', 500).notNullable().defaultTo('TBD');`<br />

### Invites Table

`invites.increments();`<br />
`invites`<br />
  `.integer('event_id')`<br />
  `.unsigned()`<br />
  `.references('id')`<br />
  `.inTable('events')`<br />
  `.onUpdate('CASCADE')`<br />
  `.onDelete('CASCADE');`<br />
`invites`<br />
  `.integer('account_id')`<br />
  `.unsigned()`<br />
  `.references('id')`<br />
  `.inTable('accounts')`<br />
  `.onUpdate('CASCADE')`<br />
  `.onDelete('CASCADE');`<br />
`invites.string('food', 500).notNullable().defaultTo('TBD');`<br />
`invites.boolean('rsvp').notNullable().defaultTo(false);`<br />
`invites.text('notes', 2000);`<br />

### Food Tables

`food.increments();`<br />
`food`<br />
  `.integer('event_id')`<br />
  `.unsigned()`<br />
  `.references('id')`<br />
  `.inTable('events')`<br />
  `.onUpdate('CASCADE')`<br />
  `.onDelete('CASCADE');`<br />
`food.string('name').notNullable();`<br />
`food.string('food_qty', 128);`<br />
`food.string('category', 128);`<br />

## Endpoints

### Base Url

https://potluck-planner-v2.herokuapp.com/

### Account-Routes

##### POST https://potluck-planner-v2.herokuapp.com/accounts/register

Request:{   
            "firstname": "John",
            "lastname": "Doe",
	        "username": "JohnDoe123",
	        "password": "pa$$w0rd"
        }

Creates and returns a token.

##### POST https://potluck-planner-v2.herokuapp.com/accounts/login

Request:{   
	        "username": "JohnDoe123",
	        "password": "pa$$w0rd"
        }

Creates and returns a token.

##### GET https://potluck-planner-v2.herokuapp.com/accounts

Returns signed-in users account information and events that user has created along with any events that user has been invited to.

##### PUT https://potluck-planner-v2.herokuapp.com/accounts/:id

id in url refers to the account id

Request:{   
            "firstname": "John",
            "lastname": "Doe",
	        "username": "JohnDoe123"
        }

Updates account information

### Events-Routes

##### GET https://potluck-planner-v2.herokuapp.com/events

Returns all events that the signed in user has created.

##### GET https://potluck-planner-v2.herokuapp.com/events/:id

id in url refers to the event id

Returns an event by id.

##### POST https://potluck-planner-v2.herokuapp.com/events

Request:{
            "name": "Picnic",
            "date": "10/2/2019",
            "time": "12 pm",
            "location": "The zoo"
        }

Creates a new PotLuck event.

##### POST ##### GET https://potluck-planner-v2.herokuapp.com/events/:id/invites

id in url refers to the event id

Request:{
            "account_id:" 2
        }

Adds requested user by id to list of invites for an event.

##### GET ##### GET https://potluck-planner-v2.herokuapp.com/events/invites:id

id in url refers to the account id

Returns all events the signed-in user has been invited to.

##### POST https://potluck-planner-v2.herokuapp.com/events/:id/food

id in url refers to the event id

Request:{
            "name": "potato chips",
            "food_qty": "2 bags",
            "category": "snacks"
        }

Adds requested food item to list of food for an event.

##### GET https://potluck-planner-v2.herokuapp.com/events/:id/food

id in url refers to the account id

Returns all food that has been added to an event

##### GET https://potluck-planner-v2.herokuapp.com/events/food/:id

id in url refers to the food item id

Returns a food by id

##### PUT https://potluck-planner-v2.herokuapp.com/events/:id/invites

id in url refers to the invite id

Request:{
            "food": "soda pop",
            "food_qty: "12 pk",
            "rsvp": true,
            "notes": "I am going to bring regular and diet."

        }

Allows invited user to list what food item they are bringing, rsvp and add optinal notes.

##### PUT https://potluck-planner-v2.herokuapp.com/events/:id

id in url refers to the event id

Request:{
            "name": "Picnic",
            "date": "10/2/2019",
            "time": "12:30 pm",
            "location": "The zoo"
        }

Updates an event.

##### DELETE https://potluck-planner-v2.herokuapp.com/events/:id

id in url refers to the event id

Deletes an event.

Here you will find the documentation and resources for the Potluck Planner Backend Node server. 

## Endpoints

### [Click this link for the list of endpoints and how to use them!](https://docs.google.com/document/d/1ZAGspcgEKSvwzJ7wTOKF_97kW1xaKpER7XVd8HG9NkU/edit?usp=sharing "Click me!!!!!!")

---

Database design (WIP): <https://docs.google.com/spreadsheets/d/1oV57Zhx2LFWPCgU77jBBC3DTM9ofsY4b-Q3MZUrKdbo/edit?usp=sharing>
