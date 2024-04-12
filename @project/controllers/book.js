
class Book {
    constructor(db){
        this.db = db;
    }

    
    getBooks = async (req,res,next) => {
        try{
            let books = await this.db.books.findAll();
            return res.json({
                success:true,
                message:"Books fetched successfully",
                data:books
            });
        }catch(error){
            return res.json({
                success:false,
                message:error.message ? error.message : "An error occurred fetching books"
            });
        }
    }


    createBook = async (req,res,next) => {
        try{
            let {title,author,description,datePublished} = req.body;
            if(title && author && datePublished && description){
                let result = await this.db.books.create({
                    title,
                    author,
                    description,
                    datePublished
                });
    
                return res.json({
                    success:true,
                    message:"Book created successfully",
                    data: result
                });
    
            }else{
                if(!title){
                    return res.json({
                        success:false,
                        message:"Title is required"
                    });
                }else if(!author){
                    return res.json({
                        success:false,
                        message:"Author is required"
                    });
                }else if(!datePublished){
                    return res.json({
                        success:false,
                        message:"Date of publish is required"
                    });
                }else if(!description){
                    return res.json({
                        success:false,
                        message:"Description is required"
                    });
                }
            }
        }catch(error){
            return res.json({
                success:false,
                message:error.message ? error.message : "An error occurred creating book"
            });
        }
    }

}

module.exports = Book;