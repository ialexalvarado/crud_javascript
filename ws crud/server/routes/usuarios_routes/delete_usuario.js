const Helper = require("../../conf/helper");
const helper = new Helper();

function delete_usuario() {
    return async (req, res) => {
        // let line_id= req.params.line_id
        let id= req.params.id
        const conn = helper.connection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                res.status(200).json(err);
            } else {
                const sql = `delete from tb_usuarios where int_id_usuario=${id};`;
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

exports.delete_usuario = delete_usuario;