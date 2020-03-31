const Helper = require("../../conf/helper");
const helper = new Helper();

function post_usuario() {
    return async (req, res) => {
        // let line_id= req.params.line_id
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
                const sql = `INSERT INTO tb_usuarios (vchar_nombre, vchar_apellido, vchar_telefono,int_edad, date_fecha_ingreso, vchar_foto) VALUES 
                ('${nombre}', '${apellido}', '${telefono}', '${edad}', '${fecha_ingreso}', '${foto}');`;
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

exports.post_usuario = post_usuario;