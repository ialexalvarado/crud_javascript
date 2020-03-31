
// Get dependencies
let express       = require('express')
let path          = require('path')
let http          = require('http')
let bodyParser    = require('body-parser')
var logger        = require('morgan')
const cors = require('cors')

let app = express();
app.enable('trust proxy')
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', '*')
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')));

let routes = require('./server/routes/routes');
app.use('/api', routes);

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/

let port = process.env.PORT || '3000';
app.set('port', port);

let server = http.createServer(app);
server.listen(port, () => console.log(`***** Magic happens on localhost:${port} *****`));