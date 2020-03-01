const service = require("./service");

Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }
  return novoArrayMapeado;
};
async function main() {
  try {
    const results = await service.obterPessoas("a");
    // const names = [];
    // fazendo por forEach

    // results.results.forEach(function(item) {
    //   names.push(item.name);

    //   console.log("names", names);
    // });

    // fazendo por Map
    // const names = results.results.map(function(pessoa) {
    //   return pessoa.name;
    // });
    // fazendo por Map em UMA linha
    // const names = results.results.map(pessoa => pessoa.name);
    const names = results.results.meuMap(function(pessoa, indice) {
      return pessoa.name;
    });
    console.log("names", names);
  } catch (error) {
    console.error("Deu Ruim", error);
  }
}
main();
