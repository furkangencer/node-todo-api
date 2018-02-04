var mongoose = require('mongoose');
// Important! Mongoose buffers all the commands until it's connected to the database.
// This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.

// Mongoose let's you integrate your own Promise library if you like.
// In order to use regular ES6 Promises with Mongoose though, you must explicitly specify global.Promise which is the built-in JavaScript Promise.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
// var todoSchema = new mongoose.Schema();

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

/*
// Create instance of model
var newTodo = new Todo({
    text: 'Cook dinner'
});

// Save to db
newTodo.save().then((doc) => {
    console.log('Saved todo', JSON.stringify(doc,undefined,2));
}, (e) => {
    console.log('Unable to save todo', e);
});*/


var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var user = new User({
    email: 'petrucci@example.com'
});

user.save().then((doc) => {
    console.log('User saved', doc);
}, (e) => {
    console.log('Unable to save user', e);
});