// cadastro de usuario, usa a função save de user
const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')   //comparar a senha que esta no banco de dados criptografada com a senha do login

// validar o token , tempo de expiração

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        // se usuário não existe
        if (!user) return res.status(400).send('Usuário não encotrado!')

        //comparação do hash do usuário
        const isMatch = bcrypt.compareSync(req.body.password, user.password)  // pega a requisicao salva e compara no user password
        if (!isMatch) return res.status(401).send('Email ou senha inválidos!')

        // token (precisar pegar a data atual e dividir por 1000(por que a data é desde 1970 até hoje.))
        const now = Math.floor(Date.now() / 1000)

        // conteúdo do token jwt
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        // mandando o token pro usuário
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null       // se o body não estiver setado volta nulo
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)    //decodificar o token
                if (new Date(token.exp * 1000) > new Date()) {       // 1000 porque no JS , usa o tempo em milissegundos, caso seja maior o token ainda esta valendo
                    return res.send(true)
                }
            }
        } catch (e) {
            // problema no token
        }

        res.send(false)
    }

    return { signin, validateToken }
}

/*
iat:  data de geração do token (emitido em ...)
exp  data de expiração
Date.now exemplo token

1518371288 + (60) 1 min
1518371288 + (60 * 60) 1 hora
1518371288 + (60 * 60 * 24) 1 dia
1518371288 + (60 * 60 * 24 * 5) 5 dias
*/