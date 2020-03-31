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
            mysqlConf.socketPath = `/cloudsql/mx-vianney-001:us-central1:db-n1-standard-8-produccion`
            // return 'HOLO'
        conn = mysql.createConnection(mysqlConf)

    } else if (enviroment == 'DEV') {

    } else {
        return false
    }




    return conn

}

module.exports = Helper;