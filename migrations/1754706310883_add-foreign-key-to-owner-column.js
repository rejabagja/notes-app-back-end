/* eslint-disable camelcase */

const shorthands = undefined;

const up = (pgm) => {
  // create new user
  pgm.sql(
    "INSERT INTO users(id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes')"
  );

  // changes notes owner to 'old_notes' where owner is null
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // add foreign key constraint on notes.owner table to users.id table
  pgm.addConstraint(
    'notes',
    'fk_notes.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

const down = (pgm) => {
  // delete foreign key constraint on notes.owner and users.id
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // rollback set notes owner to null
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // delete user where id = 'old_notes'
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};

module.exports = { up, down, shorthands };