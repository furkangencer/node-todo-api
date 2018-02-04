const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

// Middleware function with no mount path.
// The function is executed every time the app receives a request.
// Here we can now send json to our express application
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};