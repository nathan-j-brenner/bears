/// <reference path="typings/index.d.ts" />

import * as express from 'express';
const app = express();
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as Bear from './app/models/bears';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://admin:admin@ds011903.mlab.com:11903/dabears')

const router = express.Router();

router.use((req, res, next)=>{
    console.log('Something is happening.');
    next();
});

router.get('/', (req, res)=>{
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.listen(port);
console.log(`Magic happens on port ${port}`);
