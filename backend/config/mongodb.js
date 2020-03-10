// conexão com mongodb  (mongoose biblioteca ODM)       //use... é para não gerar advertência
// node console log colors, para erro ao conectar com o mongodb
const mongoose = require('mongoose')
// localhost = 127.0.0.1  | Virtualbox 192.168.99.100
mongoose.connect('mongodb://192.168.99.100/knowledge_stats', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'ERRO! Não foi possivel conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })