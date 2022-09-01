const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// use morgan to log incoming requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//handling incoming requests(routes)


// Handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.get('/', (req, res, next) => {
    res.send('<h1>Book My Book Home Page</h1>')
});

/*
app.listen(3000, () => {
    console.log("we are up & running at port 3000");
});
*/

module.exports = app;