const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

// Models que fazem a conexão com banco de dados
class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

    const isValidData = moment(data).isSameOrAfter(dataCriacao)
    const isValidClient = atendimento.cliente.length >= 5

    const validations = [
      {
        nome: 'data',
        valido: isValidData,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: isValidClient,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]

    const erros = validations.filter(campo => !campo.valido)
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {

      const atendimentoDatado = {
        ...atendimento, dataCriacao, data
      }

      const sql = `INSERT INTO atendimentos SET ?`

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(atendimento)
        }
      })
    }

  }

  // não tem atendimento pra receber, só a resposta que vou dar
  lista(res) {
    const sql = 'SELECT * FROM atendimentos'

    conexao.query(sql, (erro, result) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(result)
      }
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

    conexao.query(sql, (erro, result) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(result[0])
      }
    })
  }

  altera(id, valores, res) {
    if(valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }
    const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

    conexao.query(sql, [valores, id], (erro, result) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({...valores, id})
      }
    })
  }

  deleta(id, res) {
    const sql = 'DELETE FROM atendimentos WHERE id = ?'

    conexao.query(sql, id, (erro, result) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Atendimento
