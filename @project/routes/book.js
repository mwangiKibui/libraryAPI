const express = require('express');
const db = require("../models/db");
const Book = require('../controllers/book');
const router = express.Router();

const book = new Book(db);


router.get("/books",(req,res,next) => book.getBooks(req,res,next));

router.post("/books",(req,res,next) => book.createBook(req,res,next));

router.put("/books", (req,res,next) => res.json({
    success:1,
    message:"Book updated Successfully"
}));

router.delete("/books", (req,res,next) => res.json({
    success:1,
    message:"Book deleted Successfully"
}));

module.exports = router;