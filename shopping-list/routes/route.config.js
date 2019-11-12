const express = require('express');
const fs = require('fs');

const route = express.Router();

// GET Routes
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
});
route.get('/add', (req, res) => {
    res.render('addItem',{
        title: "Add New Item"
    })
});

// Update
route.get('/update/:id', (req, res) => {
    let itemId = req.params.id;
    let filePath = './mock-data/list.json';
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else {
            let result = JSON.parse(data);
            let len = result.length;
            for(let i = 0; i < len; i++) {
                if(result[i]._id == itemId){
                    res.render('update', {
                        title: 'Update Item',
                        _id: result[i]._id,
                        name: result[i].name,
                        price: result[i].price,
                        quantity: result[i].quantity
                    });
                    break;
                }
            }
        }
    });
});
route.post('/update', (req, res) => {
    // res.send('<h1>Record Updated</h1>');
    let filePath = './mock-data/list.json'
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else {
            let result = JSON.parse(data);
            result.forEach(item => {
                if(item._id == req.body._id){
                    item.name = req.body.name;
                    item.quantity = parseInt(req.body.quantity);
                    item.price = parseFloat(req.body.price);
                }
            });
            fs.writeFile(filePath, JSON.stringify(result), (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(`Item updated successfully`);
                    res.redirect('/');
                }
            });
        }
    });
});

// Delete
route.get('/delete/:id', (req, res) => {
    let itemId = req.params.id;
    let filePath = './mock-data/list.json';
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else {
            let result = JSON.parse(data);
            let len = result.length;
            for(let i =  0; i < len; i++){
                if(result[i]._id == itemId){
                    let index = result.indexOf(result[i]);
                    result.splice(index, 1);
                    break;
                }
            }
            console.log(result);
            fs.writeFile(filePath, JSON.stringify(result), (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log('item deleted successfully');
                    res.redirect('/');
                }
            });
        }
    });
});

// Add
route.post('/add', (req, res) => {
    let filePath = './mock-data/list.json';
    console.log(req.body);
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err);
        } else {
            let result = JSON.parse(data);
            let max = 0;
            result.forEach(item => {
                if(item._id > max) max = item._id;
            });
            let newList = {
                _id: max+1,
                name: req.body.name,
                quantity: parseInt(req.body.quantity),
                price: parseFloat(req.body.price)
            }
            result.push(newList);
            fs.writeFile(filePath, JSON.stringify(result), (err) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(`List updated successfully`);
                    res.redirect('/');
                }
            });
        }
    });
});

module.exports = route;