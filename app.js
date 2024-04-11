const express = require('express');
const routes = require('./@project/routes');
const db = require("./@project/models/db");

require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT ? process.env.NODE_DOCKER_PORT : 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true})); // accept requests with url-encoded type.

// routes.
app.use("/api/v1/",[routes]);

// start the db.
app.listen(PORT,() => {
    console.log(`Application running on Port ${PORT}`);
    db.customSync
    .then(msg => console.log("Hurray!! "+msg))
    .catch(error => console.error("Oops!! "+error));
});