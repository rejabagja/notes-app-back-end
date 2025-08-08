const shorthands = undefined;

const up = (pgm) => {
  pgm.addColumns('notes', {
    owner: {
      type: 'VARCHAR(50)',
    },
  });
};

const down = (pgm) => {
   pgm.dropColumn('notes', 'owner');
};

module.exports = { up, down, shorthands };