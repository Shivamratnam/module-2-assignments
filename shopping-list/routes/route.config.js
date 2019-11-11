const express = require('express');
const fs = require('fs');

const route = express.Router();

// route paths
route.get('/', (req, res) => {
    let filePath = './mock-data/list.json';
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else {
            let items = JSON.parse(data);
            res.render('home', {
                title: "Shopping List",
                items: items
            });
        }
    });
    
    // getMagicShowData(req, res);
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