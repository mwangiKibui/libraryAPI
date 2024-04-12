const dbConfig = require('../config/db');
const Sequelize = require("sequelize");
const Pool = require('pg').Pool;


const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port:dbConfig.port,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models.
const books = require('./Book')(sequelize,Sequelize);

const models = [{
    "key" : "books",
    "value": books
}];

db.models = models;

for(let model of models){
    db[model.key] = model.value;
}


db.customSync = new Promise(async (resolve,reject) => {
    try {
        await db.sequelize.sync();

        resolve("database synced successfully");
    }catch(error){
        if(error.message && error.message.toLowerCase().includes('unknown database') || error.message.toLowerCase().includes('does not exist')){
            // we have to create the database.
            try {
                // let dbConnection = await mysql.createConnection({
                //     host:dbConfig.HOST,
                //     user: dbConfig.USER,
                //     // database: dbConfig.DB
                // });
                let dbConnection = new Pool({
                    user: dbConfig.USER,
                    host: dbConfig.HOST,
                    // database: 'api',
                    password: dbConfig.PASSWORD,
                    port: dbConfig.port,
                });

                let result = await dbConnection.query('CREATE DATABASE '+dbConfig.DB);

                console.log("the result of creating db ",result);

                try {

                    await db.sequelize.sync();

                    // console.log("db creation results: ",results);

                    resolve("db created and synced successfully");

                }catch(error){

                    reject("Db created successfully, an error occurred syncing tables: "+error.message);

                }
            }catch(error){

                reject("an error occurred creating db: "+error.message);

            }
        }else{

            reject('an error occurred: '+error.message);

        }
    }
});
module.exports = db;