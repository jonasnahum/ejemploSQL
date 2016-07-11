var intravenous = require("intravenous");

//local modules
var DbConnection = require("./../database/dbConnection");
//DbConnection.$inject = ["mysql"];

var ClientesApi = require("./clientesApi");
ClientesApi.$inject = ["dbConnection"];

var ClientesController = require("./clientesController");
ClientesController.$inject = ["express", "clientesApi"];

var container = intravenous.create();

//register
container.register("dbConnection", DbConnection);
container.register("clientesApi", ClientesApi);
container.register("clientesController", ClientesController);
container.register("mysql", { module: require('mysql') });
container.register("express", { module: require('express') });

module.exports = container;
