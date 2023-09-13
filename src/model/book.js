const pool = require('../config/postgre')

const addBook = (data) => {
    const { id, title, image, author } = data;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO "favorite" (id,title,author,image) VALUES('${id}','${title}','${author}','${image}')`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  };

  const getBook = () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM "favorite"`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  };
  
  const deleteBook = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM "favorite" WHERE id = '${id}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  };

  const getBookDetail = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM "favorite" where id = '${id}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  module.exports = {addBook,deleteBook,getBook,getBookDetail};