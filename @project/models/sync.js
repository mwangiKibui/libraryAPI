const db = require('./db');


// sync all models.

let models = Object.values(db.models);

models.forEach((model) => model.value.sync({alter:true}));

// done syncing all models

process.on('exit', function(){
    console.log("Done syncing tables");
});