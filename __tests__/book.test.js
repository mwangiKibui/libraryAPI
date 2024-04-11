const SequelizeMock = require("sequelize-mock");
const httpMocks = require('node-mocks-http');
const {createBook,getBooks} = require("../@project/controllers/book");

describe("book controller",() => {
    let sequelizeMock;
    // let Book;

    beforeAll( () => {
        sequelizeMock = new SequelizeMock();
        Book = sequelizeMock.define("Book",{
            title:"My Life in Crime",
            author:"John Kiriamiti",
            description:"John Kiriamiti's life in crime",
            datePublished:"01/01/2000",
            noOfChapters:10,
            noOfPages:500
        });
    });

    describe("createBook",() => {

        it("should fail to create a book no title", async() => {
            let httpReq = httpMocks.createRequest({
                body:{
                    author:"john kiriamiti",
                    description:"John Kiriamiti's life in crime",
                    datePublished:"01/01/2000",
                    noOfChapters:10,
                    noOfPages:500
                }
            });
            let httpRes = httpMocks.createResponse();

            await createBook(httpReq,httpRes);

            expect(httpRes.statusCode).toBe(200);
            expect(httpRes.statusMessage).toBe('OK');
            expect(httpRes._getJSONData().success).toBe(false);
            expect(httpRes._getJSONData().message).toBe('Title is required');

        });

        it("should fail to create a book no author", async() => {
            let httpReq = httpMocks.createRequest({
                body:{
                    title:"my life in crime",
                    description:"John Kiriamiti's life in crime",
                    datePublished:"01/01/2000",
                    noOfChapters:10,
                    noOfPages:500
                }
            });
            let httpRes = httpMocks.createResponse();

            await createBook(httpReq,httpRes);

            expect(httpRes.statusCode).toBe(200);
            expect(httpRes.statusMessage).toBe('OK');
            expect(httpRes._getJSONData().success).toBe(false);
            expect(httpRes._getJSONData().message).toBe('Author is required');
        });

        it("should create the book", async() => {
            let httpReq = httpMocks.createRequest({
                body:{
                    title:"my life in crime",
                    author:"john kiriamiti",
                    description:"John Kiriamiti's life in crime",
                    datePublished:"01/01/2000",
                    noOfChapters:10,
                    noOfPages:500
                }
            });
            let httpRes = httpMocks.createResponse();

            await createBook(httpReq,httpRes);

            expect(httpRes.statusCode).toBe(200);
            expect(httpRes.statusMessage).toBe('OK');
            expect(httpRes._getJSONData().success).toBe(true);
            expect(httpRes._getJSONData().message).toBe('Book created successfully');
        });


    });

    describe("getBooks",() => {
        it("should return all books",async () => {

            const httpReq = httpMocks.createRequest();
            const httpRes = httpMocks.createResponse();

            await getBooks(httpReq,httpRes);

            // console.log("the response received ",httpRes._getJSONData());

            expect(httpRes.statusCode).toBe(200);
            expect(httpRes.statusMessage).toBe('OK');
            expect(httpRes._getJSONData().success).toBe(true);
            expect(httpRes._getJSONData().message).toBe('Books fetched successfully');

        })
    })
})