module.exports = (sequelize,Sequelize) => {
    const Book = sequelize.define("book",{
        title:{
            type: Sequelize.STRING
        },
        author:{
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        datePublished: {
            type: Sequelize.DATE
        },
        noOfChapters:{
            type: Sequelize.INTEGER
        },
        noOfPages:{
            type:Sequelize.INTEGER
        }
    });
    return Book;
}