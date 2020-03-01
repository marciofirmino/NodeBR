const Commander = require("commander");
const Database = require("./database");
const Heroi = require("./heroi");
async function main(params) {
  Commander.version("v1")
    .option("-n,--nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "ID do Heroi")

    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Listar um heroi")
    .option("-r, --remover [value]", "Remover um heroi pelo id")
    .option("-a, --atualizar [value]", "Atualizar um heroi pelo id")
    .parse(process.argv);
  const heroi = new Heroi(Commander); // eu criei esse heroi só pra passar as informações que eu preciso

  try {
    if (Commander.cadastrar) {
      delete heroi.id; // para quando chamar nao dar id undefined
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error("Heroi nao foi cadastrado");
        return;
      }
      console.log("Heroi cadastrado com sucesso");
      console.log(heroi);
      // const resultado = await Database.cadastrar(Commander)
    }
    if (Commander.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
      return;
    }
    if (Commander.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error("Nao foi possivel remover o Heroi");
        return;
      }
      console.log("Heroi removido com sucesso");
    }
    if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);

      //remover todas as chaves que estiverem com undefined | null
      const dado = JSON.stringify(heroi);
      console.log(dado);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );
      if (!resultado) {
        console.error("Não foi possivel atualizar o heroi");
        return;
      }
      console.log("Heroi atualizado com Sucesso");
    }
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
