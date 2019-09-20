// não usa o consign nessa função / função que retorna 1 middleware, so chama se o usuario for adm
module.exports = middleware => {
    return (req, res, next) => {
        if (req.user.admin) {
            middleware(req, res, next)
        } else {
            res.status(401).send('Usuário não é administrador.')
        }
    }
}