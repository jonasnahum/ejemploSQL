var intravenous = require("intravenous");

//local modules
var config = require('./../database/db-config');
var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mysql", "config"];

var ClientesApi = require("./clientesApi");
ClientesApi.$inject = ["dbConnection"];

var ClientesController = require("./clientesController");
ClientesController.$inject = ["express", "clientesApi"];

var container = intravenous.create();

//register
container.register("dbConnection", DbConnection);
container.register("clientesApi", ClientesApi);
container.register("clientesController", ClientesController);
container.register("config", config);
container.register("mysql", { module: require('mysql') });
container.register("express", { module: require('express') });

module.exports = container;
