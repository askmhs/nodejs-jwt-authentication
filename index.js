import restify from 'restify';
import mongoose from 'mongoose';

/**
 * Create restify server
 *
 * @type {*|Server}
 */
const server = restify.createServer({
    name: 'restify-simple-api'
});

/**
 * Configure restify parser plugins
 */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/**
 * Set mongoose default promise
 */
mongoose.Promise = global.Promise;

/**
 * Read the .env file
 */
require('dotenv').config();

/**
 * Connecting to DB
 */
mongoose.connect(process.env.DB_HOST, {
    useMongoClient: true
}).then(() => {
    console.log("Successfully connected to DB!");
}, (err) => {
    console.log("An error occurred while connecting to DB!");
    throw new Error(err);
});

/**
 * Test server
 */
server.get('/', (req, res) => {
    res.json("Server UP!!!");
});

/**
 * Call routers
 */
require('./src/Routes/User.route')(server);
require('./src/Routes/Auth.route')(server);

/**
 * Starting server
 */
server.listen(3000, () => {
   console.log("Server up at port 3000!");
});