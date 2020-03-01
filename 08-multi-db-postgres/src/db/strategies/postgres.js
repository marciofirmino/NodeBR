const ICrud = require("./interfaces/interfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;

    this._connect();
  }

  async defineModel() {
    this._herois = driver.define(
      "heroes",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        nome: { type: Sequelize.STRING, required: true },
        poder: {
          type: Sequelize.STRING,
          required: true
        }
      },
      {
        tableName: "TB_HEROIS",
        freezeTableName: false,
        timestamps: false
      }
    );
    await herois.sync();
  }
  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("fail!", error);
      return false;
    }
  }

  _connect() {
    this._driver = new Sequelize("heroes", "erickwendel", "minhasenhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorsAliases: false
    });
    this.defineModel();
  }

  create(item) {
    console.log("O item foi salvo em Postgres");
  }
}

module.exports = Postgres;
