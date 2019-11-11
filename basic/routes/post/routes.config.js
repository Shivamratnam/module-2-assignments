const express = require('express');
const route = express.Router();

route.post('/', (req, res) => {
    res.send('Hello World!');
});
route.post('/form', (req, res) => {
    res.status(200)
    .send('Form Route');
});

// export route module
module.exports = route;