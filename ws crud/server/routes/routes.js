let express = require('express');

module.exports = (function() {

    var router = express.Router();

    router.get('/', (req, res) => {
        res.status(200).json('API for users management. ')
    })

    require('./usuarios')(router)

    return router;
})();