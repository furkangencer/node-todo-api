const mongoose = require('mongoose');
// Important! Mongoose buffers all the commands until it's connected to the database.
// This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.

// Mongoose let's you integrate your own Promise library if you like.
// In order to use regular ES6 Promises with Mongoose though, you must explicitly specify global.Promise which is the built-in JavaScript Promise.
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOLAB_URI).then().catch((err) => {
    console.log(`Can't connect to MongoDB \n ${err}`);
});
// https://forum.freecodecamp.org/t/guide-for-using-mongodb-and-deploying-to-heroku/19347
module.exports = {
    mongoose: mongoose
};