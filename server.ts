/// <reference path="typings/index.d.ts" />
// call the packages we need
import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
const Bear = require('./app/models/bears');

//configure  body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://admin:admin@ds011903.mlab.com:11903/dabears')

// Routes for our api
const router = express.Router();

// middleware to use for all requests
router.use((req, res, next)=>{
    console.log('Something is happening.');
    next();
});

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res)=>{
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/bears)
    .post((req, res)=>{
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(err=>{
            if (err) res.send(err);

            res.json({ message: 'Bear created!'});
        });
    });
    
// register our routes
app.use('/api', router);

// start the server
app.listen(port);
console.log(`Magic happens on port ${port}`);
