const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb");
const Postgres = require("./db/strategies/postgres");

// a index é responsavel por chamar os seus metodos

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
