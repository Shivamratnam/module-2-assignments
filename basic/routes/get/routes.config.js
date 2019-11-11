const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.send('Hello World!');
});
route.get('/year', (req, res) => {
    let age = req.query.age;
    if(age){
        res.send(`You were born in ${getBirthYear(age)}`);
    } else {
        res.send("Invalid request url");
    }
});
route.get('/time', (req, res) => {
    let date = new Date();
    res.status(200)
    .send(date);
});
// user defined functions
function getBirthYear(age){
    let date = new Date();
    currYear = date.getFullYear();
    let birthYear = currYear - age;
    return birthYear;
}

// export route module
module.exports = route;