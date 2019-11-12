const express = require('express');
const fs = require('fs');

const route = express.Router();

// route paths
route.get('/', (req, res) => {
    getMagicShowData(req, res);
});
route.get('/book?:id', (req, res) => {
    let id = req.query.id;
    let filePath = './mock-data/showInfo.json';
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else {
            let result = JSON.parse(data);
            let len = result.length;
            let item = {};
            for(let i = 0; i < len; i++){
                if(result[i]._id == id){
                    item = result[i];
                    break;
                }
            }
            res.render('booking-form', {
                title: "Book your show",
                data: item 
            });
        }
    });
});

route.post('/confirmation', (req, res) => {
    let filePath = './mock-data/showInfo.json';
    fs.readFile(filePath, (err, data) => {
        let result = JSON.parse(data).map(item => {
            if(item.showName == req.body.showname){
                item.seats -= req.body.seatsBook;
            }
            return item;
        });
        fs.writeFile(filePath, JSON.stringify(result),(err) => {
            if(err){
                console.log(err);
            } else {
                console.log(req.body);
                res.render('confirmation-page', {
                    showname: req.body.showname,
                    custname: req.body.custname,
                    mobile: req.body.mobile,
                    seatsBook: req.body.seatsBook,
                    totalPrice: req.body.price * req.body.seatsBook
                });
            }
        });
    });
});

// custom functions
function getMagicShowData(req, res){
    let filePath = './mock-data/showInfo.json';
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else{
            let showInfo = JSON.parse(data);
            res.render('home', {
                title: 'Magic Show Details',
                showInfo: showInfo
            });
        }
    });
}

module.exports = route;