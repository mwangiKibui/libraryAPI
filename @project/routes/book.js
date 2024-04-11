const express = require('express');
const {getBooks,createBook} = require('../controllers/book');
const router = express.Router();


router.get("/books",getBooks);

router.post("/books",createBook);

router.put("/books", (req,res,next) => res.json({
    success:1,
    message:"Book updated Successfully"
}));

router.delete("/books", (req,res,next) => res.json({
    success:1,
    message:"Book deleted Successfully"
}));

module.exports = router;