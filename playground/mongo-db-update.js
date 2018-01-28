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

    // https://docs.mongodb.com/manual/reference/operator/update/
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5a6e04f8f1cfe40fb021249b')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a6cdfd24550b719b45398e8')
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});
