const modelBook = require("../model/book")
const {response} = require("../middleware/response")
const bookController = {
    getBook: (req,res,next) => {
        modelBook.getBook()
        .then((result) => {
            response(res,200,true,result.rows,"Get Books Favorite Success")
        })
        .catch((err) => {
            response(res, 404, false,err,"Get Data Books Fail")
        })
    },
    postFavorite: async (req,res,next) => {
        const data = {
            id: req.body.id,
            title: req.body.title,
            image: req.body.image,
            author: req.body.author,
          };
        try {
        // const cek = await modelBook.addBook(data)
        // if (cek.rows.length !== 0) {
        //     console.log(cek.rows)
        //     response(res,404,false,cek.rows,"Terdapat Buku Tersebut di Favorite")
        // } else {
        //     console.log(data);
            const result = await modelBook.addBook(data);
            if (result) {
                response(res,200,true,data,"Post Books Favorite Success")
            }    
        // }
        } catch (error) {
            response(res, 404, false,error,"Post Data Books Fail")
        }
    },
    deleteFavorite: async (req,res,next) => {
        const bookId = req.params.id;
    try {
        const result = await modelBook.deleteBook(bookId);
        if (result) {
            response(res,200,true,result.data.rowCount,"Delete Books Favorite Success")
        } 
        } catch (error) {
            response(res, 404, false,error,"Delete Data Books Fail")
        }
    }
}

exports.bookController = bookController