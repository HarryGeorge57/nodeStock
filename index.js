const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;



//use body parser middleware
app.use(bodyParser.urlencoded({exended: false}));


//API KEY pk_6b72cb1fb7e44a8c8563dcea04dd5943
//create call api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_6b72cb1fb7e44a8c8563dcea04dd5943', {json: true}, (err, res, body) => {
        if(err){return console.log(err);}
        if(res.statusCode === 200){
            // console.log(body);
            finishedAPI(body);
        };
    });
}

//Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


//Set handelbar index GET routes
app.get('/', function (req, res){
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI
        });
    }, "fb");
});


//Set handelbar index POST routes
app.post('/', function (req, res){
    call_api(function(doneAPI){
            //posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI
        });
    }, req.body.stock_ticker);
});

//Create About Page Route
app.get('/about.html', function (req, res){
    res.render('about');
});
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
