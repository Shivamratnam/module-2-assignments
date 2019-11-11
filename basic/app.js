// import required modules
const express = require('express');
var getroute = require('./routes/get/routes.config.js');
var postroute = require('./routes/post/routes.config.js');

const app = express();

// route definitions
app.use('/', getroute);
app.use('/', postroute);

// starting point of application
( () => {
    let port;
    if(process.argv[2]){
        port = process.argv[2];
    } else {
        port = process.env.PORT || 8080;
    }
    
    // start the server
    app.listen(port, () => {
        console.log(`Server started and listning at 'http://localhost:${port}'`);
    });
})();