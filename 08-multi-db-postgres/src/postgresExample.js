// arquivo de teste para testar caso voce nao tenha uma estrutura.
// npm install sequelize pg-hstore pg sequelize

const Sequelize = require("sequelize");

const driver = new Sequelize("heroes", "erickwendel", "minhasenhasecreta", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorsAliases: false
});

async function main() {
  const herois = driver.define(
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
  await herois.create({
    nome: "Lanterna Verde",
    poder: "Anel "
  });
  const result = await herois.findAll({ raw: true }); // o raw:true é só pra trazer o qeu eu quero!

  console.log("result", result);
}

main();
