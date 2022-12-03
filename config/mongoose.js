const mongoose = require('mongoose');
const env=require('./enviorment')
mongoose.connect(`mongodb://localhost/${env.db}`);//doubt hai mongodb

const db = mongoose.connection;//yha doubt hai 
function myconsole(msg){// important
    console.log(msg);
}
db.on('error', console.error.bind(myconsole, "Error connecting to MongoDB"));//mongodb


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;