const service = require("./service");

async function main() {
  try {
    const result = await service.obterPessoas("a");
    const names = [];

    //usando o for

    console.time("for");
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("for");

    //usando o forin

    console.time("forin");
    for (let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.time("forin");

    // usando o forof
    console.time("forof");
    for (pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.time("forof");

    console.log("names", names);
  } catch (error) {
    console.log("erro", error);
  }
}

main();
