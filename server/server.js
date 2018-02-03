var mongoose = require('mongoose');

// Mongoose let's you integrate your own Promise library if you like.
// In order to use regular ES6 Promises with Mongoose though, you must explicitly specify global.Promise which is the built-in JavaScript Promise.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
// var todoSchema = new mongoose.Schema();

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// Create instance of model
var newTodo = new Todo({
    text: 'Cook dinner'
});

// Save to db
newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('Unable to save todo');
});

/*
var otherTodo = new Todo({
    text: 'Feed the cat',
    completed: true,
    completedAt: 123
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc,undefined,2));
}, (e) => {
    console.log('Unable to save', e);
});
*/
