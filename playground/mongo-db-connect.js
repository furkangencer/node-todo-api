// const MongoClient = require('mongodb').MongoClient; // The line just below works too
const {MongoClient, ObjectID} = require('mongodb'); // Object Destructuring (ES6 Feature)

/*var obj = new ObjectID();
console.log(obj);*/

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');
    /*db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert to-do', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
        // result: contains the result document from MongoDB
        // ops: contains the documents inserted with added _id fields
    });*/

    db.collection('Users').insertOne({
        name: 'Furkan',
        age: 24,
        location: 'istanbul'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user info', err);
        }

        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});
