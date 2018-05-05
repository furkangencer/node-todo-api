const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findByIdAndRemove('5aede9ca43a3ef0228cbe5ae').then((todo) => {
//     console.log(todo);
// });

Todo.findOneAndRemove({_id: '5aede9ca43a3ef0228cbe5ae'}).then((todo) => {
    console.log(todo);
});