const { get_usuarios } = require('./usuarios_routes/get_usuarios')
const { post_usuario } = require('./usuarios_routes/post_usuario')
const { put_usuario } = require('./usuarios_routes/put_usuario')
const { delete_usuario } = require('./usuarios_routes/delete_usuario')


const s_get_usuarios='/get_usuarios'
const s_post_usuario='/post_usuario'
const s_put_usuario='/put_usuario'
const s_delete_usuario='/delete_usuario/:id'


module.exports = function (router)
{
    router.get(s_get_usuarios, get_usuarios())

    router.post(s_post_usuario, post_usuario())

    router.put(s_put_usuario, put_usuario())

    router.delete(s_delete_usuario, delete_usuario())
}