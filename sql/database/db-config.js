//agregar variables de desarrollo.
module.exports = {
  host: process.env.DBHOST || "localhost", //The hostname of the database you are connecting to.
  user: process.env.DBUSER || "root", //The MySQL user to authenticate as.
  password: process.env.DBPASS || "", //The password of that MySQL user.
  database: process.env.DBNAME || "store" //Name of the database to use for this connection (Optional).
};
