exports.up = function (p) {};
exports.down = function (p) {
  return p.sql`DROP TABLE IF EXISTS students;`;
};
