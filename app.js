const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;
const cors = require('cors');
// Add this middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'ptiszeex',
  host: 'rosie.db.elephantsql.com',
  database: 'ptiszeex',
  password: 'pRwfTBWx0yZACYmdG5EoAyopFwuwzebL',
  port: 5432,
});

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
      `SELECT * FROM "public"."favorite"`,
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

app.post('/book', (req, res) => {
  const data = {
    id: req.body.id,
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
  };
  try {
    console.log(data);
    const result = addBook(data);
    if (result) {
      res.send('Berhasil Memasukan Data');
    } else {
      res.send('Tidak Berhasil Memasukan Data');
    }
  } catch (error) {
    res.send('Error');
  }
});

app.get('/book', (req, res) => {
  getBook()
  .then((result) => {
    const books = result.rows;
    res.json(books);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Terjadi kesalahan dalam mengambil buku.');
  });
});

app.delete('/book/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await deleteBook(bookId);
    res.send('Berhasil Menghapus Buku');
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan dalam menghapus buku.');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
