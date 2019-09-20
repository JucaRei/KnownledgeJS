/* passport consegue fazer autenticação no facebook , google , etc
filtrar requisições */
const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

/** SecretOrKey = pega a chave, jwtFromrequest = procura no cabeçalho da requisição e extrai o token
 * done (null ou traz o usuario, caso erro )
 */
module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    // não vou ter controle de sessão associado a essa autenticação
    // filtrar as requisições e não permitir que as req sejam feitas em cima dos webservices que precisam passar pelo passport(precisam ter um usuário logado)
    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}