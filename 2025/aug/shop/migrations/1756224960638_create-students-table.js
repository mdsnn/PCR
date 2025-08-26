/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("students", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    age: { type: "integer", notNull: true, check: "age > 0 AND age < 150" },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("students");
};
