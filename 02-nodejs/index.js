/*
objetivos:
0 - Obter um usuario
1 - Obter o numero de telefone de um usuario a partir de seu ID
2 - Obter o endereço do usuario pelo ID.
*/
// importamos um modulo interno do node js

const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando der algum problea -> reject(ERRO)
  // quando sucess -> RESOLV
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      // return reject(new Error('DEU RUIM DE VERDADE!'))

      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "1199002",
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    });
  });
}
main();
// 1° Passo adicionar a palavra async > automaticamente retornará uma promise
async function main() {
  try {
    // capturar o usuario
    const usuario = await obterUsuario();

    // maneira mais rapida:
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ]);
    const endereco = resultado[1];
    const telefone = resultado[0];

    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);

    console.log(`
     Nome: ${usuario.nome},
     Telefone: (${telefone.ddd})${telefone.telefone},
     Endereco: ${endereco.rua},${endereco.numero}`);
  } catch (error) {
    console.log("Deu Ruim", error);
  }
}
// const usuarioPromise = obterUsuario();

// // para manipular o sucesso usamos a função .then
// // para manipular erros, usamos o .catch
// usuarioPromise
//   .then(function(usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: usuario.nome,
//           id: usuario.id
//         },
//         telefone: result
//       };
//     });
//   })
//   .then(function(resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefoe: resultado.telefone,
//         endereco: result
//       };
//     });
//   })
//   .then(function(resultado) {
//     console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
//     `);
//   })
//   .catch(function(error) {
//     console.error("Deu ruim", error);
//   });

// function resolverUsuario(erro, usuario) {
//   console.log("usuario", usuario);
// }
// obterUsuario(function resolverUsuario(error, usuario) {
//   // null || "" || 0 ele vai ser igual a FALSE.
//   if (error) {
//     console.error("Deu ruim em usuario", error);
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error("Deu ruim em telefone", error1);
//       return;
//     }

//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error("Deu ruim em endereco", error2);
//         return;
//       }

//       console.log(`
//     Nome: ${usuario.nome},
//     Endereco:${endereco.rua},${endereco.numero}
//     Telefone: ${telefone.ddd}${telefone.telefone}`);
