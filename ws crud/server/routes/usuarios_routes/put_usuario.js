const Helper = require("../../conf/helper");
const helper = new Helper();

function put_usuario() {
    return async (req, res) => {
        // let line_id= req.params.line_id
        let id= req.body.id
        let nombre= req.body.nombre
        let apellido= req.body.apellido
        let telefono= req.body.telefono
        let edad= req.body.edad
        let fecha_ingreso = req.body.fecha_ingreso
        let foto= req.body.foto
        const conn = helper.connection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                res.status(200).json(err);
            } else {
                const sql = `update tb_usuarios set vchar_nombre= '${nombre}', vchar_apellido='${apellido}', vchar_telefono='${telefono}', int_edad=${edad}, date_fecha_ingreso='${fecha_ingreso}', vchar_foto='${foto}' where int_id_usuario=${id};`;
                conn.query(sql, (err, result) => {
                    conn.end();
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                })
            }
        })
    }
}

exports.put_usuario = put_usuario;