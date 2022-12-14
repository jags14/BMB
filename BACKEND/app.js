const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const userRouter = require('./node-apis/users/routes/users');
const bookRouter = require('./node-apis/books/routes/books');
// const authRouter = require('');
const { default: mongoose } = require('mongoose');

// connecting to mongodb database
// mongodb+srv://jags:<PASSWORD>@cluster0.07d8ppo.mongodb.net
mongoose.connect('mongodb+srv://jags:' + process.env.DB_PASS + '@cluster0.07d8ppo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

app.get('/', (req, res, next) => {
    res.send('<h1>Book My Book Home Page</h1>')
});

//handling incoming requests(routes)
app.use('/users', userRouter);
app.use('/books', bookRouter);
// app.use('/auth', authRouter);

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

/*
app.get('/', (req, res, next) => {
    res.send('<h1>Book My Book Home Page</h1>')
});
*/


app.listen(3000, () => {
    console.log("we are up & running at port 3000");
});