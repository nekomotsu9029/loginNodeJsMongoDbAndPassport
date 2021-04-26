const mongoose = require('mongoose');
const {mongodb} = require('./keys.js');

mongoose.connect(mongodb.URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(db => console.log('Database is conected'))
    .catch(err => console.error(err));