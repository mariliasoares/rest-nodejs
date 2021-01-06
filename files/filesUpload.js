// pegar a imagem p trabalhar no nodejs com buffer
const fs = require('fs')
const path = require('path')

// lê imagem de forma síncrona, toda a imagem antes de executar oq pedimos
// termina de ler, adiciona no buffer e executa a ação passando oq salvou no buffer de memoria
/*
fs.readFile('./assets/lola1.jpeg',(erro, buffer) => {
  console.log('imagem foi buferizada')
  console.log(buffer)

  fs.writeFile('./assets/lola2.jpeg', buffer, (erro) => {
    console.log('imagem foi escrita')
  })
})

  ao inves de fazer de forma síncrona, usamos streams
  pega algo e faz conforme precisar, em paralelo, não para processos pra executar outras coisas
  nao tem funcao callback, entao usa pipe
  pipe faz com que nossa stream de leitura se transforme em uma de escrita
  como sei que terminou a leitura? pipe pega a stream q lemos lá tras e escreve 
  stream funciona emitindo eventos, alguns eventos conseguimos ativar
  trigamos/escutamos os eventos intencionalmente no .on
 */
module.exports = (pathFile, nameFile, callbackCreateImage) => {
  const validTypes = ['jpg', 'png', 'jpeg']
  const type = path.extname(pathFile)

  const isValidType = validTypes.indexOf(type.substring(1)) !== -1

  if(isValidType) {
    const newPath = `./assets/camera/${nameFile}${type}`
    
    fs.createReadStream(pathFile)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callbackCreateImage(false, newPath))
  } else {
    const erro = 'Tipo é inválido'
    console.log('Erro! Tipo inválido')
    callbackCreateImage(erro)
  } 
}
