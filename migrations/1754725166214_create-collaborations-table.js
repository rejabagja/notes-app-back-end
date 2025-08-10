const shorthands = undefined;

const up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // adding unique constraint on note_id and user_id to prevent duplicate collaboration
  pgm.addConstraint(
    'collaborations',
    'unique_note_id_and_user_id',
    'UNIQUE(note_id, user_id)'
  );

  // adding foreign key constraint on collaborations.note_id to notes.id
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.note_id_notes.id',
    'FOREIGN KEY(note_id) REFERENCES notes(id) ON DELETE CASCADE'
  );

  // adding foreign key constraint on collaborations.user_id to users.id
  pgm.addConstraint(
    'collaborations',
    'fk_collaborations.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

const down = (pgm) => {
  // dropping collaborations table
  pgm.dropTable('collaborations');
};

module.exports = { up, down, shorthands };