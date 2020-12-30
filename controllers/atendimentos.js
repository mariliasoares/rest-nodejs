module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Vc está em atendimentos hehe'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Post finalizado')
    })
}