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
      })

      .createTable('invites', invites => {
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
      })
      
      .createTable('food', food => {
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
      })
}

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('food')
        .dropTableIfExists('invites')
        .dropTableIfExists('events')
        .dropTableIfExists('accounts');
}; 

