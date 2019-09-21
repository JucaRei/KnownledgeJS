/** Temporizador que executa a cada minuto, lê os dados no banco relacional (count) em tabelas (categoria,
 * usuarios, artigos), e monta 1 objeto, que são as estaticas que ficaram no mongodb */

const schedule = require('node-schedule')

// padrão do cron (de 1 em 1 minuto)
module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        // pegando o modelo de api/stat
        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt': -1 } })
        // pega o ultimo

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        //comparar para ver se de fato a estatica mudou, se mudou eu persisto, senão simplesmente espera a proxima interação do schedule para verificar novamente
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        // qualquer uma que mudou , ele faz a persistencia
        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatícas atualizadas!'))
        }
    })
}