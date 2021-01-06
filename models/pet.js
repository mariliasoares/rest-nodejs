const conexao = require('../infraestrutura/conexao')
const uploadFile = require('../files/filesUpload')

class Pet {
  adiciona(pet, res) {
    const sql = 'INSERT INTO pets SET ?'
    
    uploadFile(pet.imagem, pet.nome, (erro, newPath) => {

      if(erro) {
        res.status(400).json({erro}) 
      } else {
        const newPet = {nome: pet.nome, imagem: newPath}
  
        conexao.query(sql, newPet, (erro) => {
          if(erro) {
            res.status(400).json(erro)
          } else {
            res.status(200).json(newPet)
          }
        })
      }
    })
  }
}

module.exports = new Pet
