function Helper() {}

var conf = require('./conf')
var mysql = require('mysql')

let enviroment = 'PROD'
//  let enviroment = 'DEV'

Helper.prototype.connection = function() {
    if (enviroment == 'PROD') {
        //config for prod
        let dbconf = conf.db

        let mysqlConf = {
            user: dbconf.user,
            password: dbconf.password,
            database: dbconf.database,
            multipleStatements: true
        }

        if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production')
        // socket for prod
            mysqlConf.socketPath = ``
        conn = mysql.createConnection(mysqlConf)

    } else if (enviroment == 'DEV') {

    } else {
        return false
    }




    return conn

}

module.exports = Helper;