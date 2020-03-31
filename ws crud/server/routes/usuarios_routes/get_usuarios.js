const Helper = require("../../conf/helper");
const helper = new Helper();

function get_usuarios() {
    return async (req, res) => {
        // let line_id= req.params.line_id
        const conn = helper.connection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                res.status(200).json(err);
            } else {
                const sql = `select int_id_usuario, vchar_nombre, vchar_apellido, vchar_telefono, int_edad, DATE_FORMAT(date_fecha_ingreso, "%Y-%m-%d") as date_fecha_ingreso, vchar_foto from tb_usuarios;`;
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

exports.get_usuarios = get_usuarios;