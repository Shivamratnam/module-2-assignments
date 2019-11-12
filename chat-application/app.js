const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
const dbconfig = require('./database/db.config');

// connect to mongodb
mongo.connect(dbconfig.DB_URI, (err, database) => {
    if(err){
        console.log(err);
    } else {
        console.log(`Database Connected`);
        let db = database.db('chatapp');
        // Connect to Socket.io
        client.on('connection', (socket) => {
            let chat = db.collection('chatHistory');

            //Function to send the status
            let sendStatus = function(sts) {
                socket.emit('status', sts);
            }

            // Get chats from the database
            chat.find().limit(100).toArray((err, data) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                    socket.emit('output', data);
                }
            });

            // Input events
            socket.on('input', (data) => {
                let name = data.name;
                let message = data.message;

                // check for name & message
                if(name == '' || message ==''){
                    sendStatus('Please enter name and message');
                } else {
                    // Store message to the database
                    query = {
                        name: name,
                        message: message 
                    }
                    chat.insertOne(query, () => {
                        client.emit('output', [data]);
                        
                        sendStatus({
                            message: 'Message sent',
                            clear: true
                        });
                    });
                }
            });

            // Handle clear
            socket.on('clear', () => {
                chat.remove({}, () => {
                    // Data cleared
                    socket.emit('status', 'Chat History Cleared');
                    socket.emit('cleared');
                });
            });
        });
    }
});