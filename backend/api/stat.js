/** Status simples contendo as informações de usuários(number),
 * categorias(number), e artigos(number)
 * Data de Criação, que foi criada essas estatisticas
 * Se não houver mudança ele simplesmente não persiste*/

module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    // mongodb busca no Postgres  - a partir desse sort, ele pega a ultima estatistica cadastrada no mongo db
    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}