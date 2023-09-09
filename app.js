const express = require('express');
// const { Pool } = require('pg');
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require('cors');
const mainRouter = require('./src/router/router')
const {response} = require('./src/middleware/response')
const modelBook = require("./src/model/book")
const {bookController} = require("./src/controller/book")
// Add this middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get('/book',bookController.getBook);
app.post('/book',bookController.postFavorite)
app.delete('/book/:id',bookController.deleteFavorite)


app.get('/', (req, res) => {
  res.send('Backend Active');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
