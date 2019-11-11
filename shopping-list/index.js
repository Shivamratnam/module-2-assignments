// import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/route.config.js');

// init express
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// config views && template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//route paths
app.use('/', mainRoute);

// starting point of the application
(() => {
    const port = process.env.PORT || 8080;
    // start the server
    app.listen(port, () => {
        console.log(`Server started at 'http://localhost:${port}'`);
    });
})();