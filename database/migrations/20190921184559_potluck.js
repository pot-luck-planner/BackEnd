exports.up = function(knex) {
    return knex.schema.createTable('accounts', accounts => {
        accounts.increments();
        accounts.string('firstname', 128).notNullable();
        accounts.string('lastname', 128).notNullable();
        accounts
          .string('username', 128)
          .notNullable()
          .unique();
        accounts.string('password', 128).notNullable();
      })

      .createTable('events', events => {
          events.increments();
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
          events.string('date', 128).notNullable();
          events.string('time', 128).notNullable();
          events.string('location', 500).notNullable();
      })

      .createTable('attendees', attendees => {
          attendees
            .integer('event_id')
            .unsigned()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          attendees
            .integer('account_id')
            .unsigned()
            .references('id')
            .inTable('accounts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          attendees.boolean('rsvp').notNullable().defaultTo(false);
      })

      .createTable('foods', foods => {
          foods.increments();
          foods
            .integer('event_id')
            .unsigned()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          foods.string('name', 500).notNullable();
          foods.boolean('requested').notNullable().defaultTo(false);
          foods.string('type', 128).notNullable();
          foods.string('diet', 128).notNullable();
          foods
            .integer('made_by')
            .unsigned()
            .references('id')
            .inTable('accounts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          foods.text('notes', 2000);
        })

      .createTable('food_ingredients', food_ingredients => {
          food_ingredients
            .integer('food_id')
            .unsigned()
            .references('id')
            .inTable('foods')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          food_ingredients
            .integer('ing_id')
            .unsigned()
            .references('id')
            .inTable('ingredients')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      })

      .createTable('ingredients', ingredients => {
          ingredients.increments();
          ingredients.string('name', 128).notNullable();
      })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('food-ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('foods')
        .dropTableIfExists('attendees')
        .dropTableIfExists('events')
        .dropTableIfExists('accounts');
};

