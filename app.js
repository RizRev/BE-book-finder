const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const port = 4000;
const cors = require('cors');
const {bookController} = require("./src/controller/book")
const Router = require("./src/router/router")
// Add this middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/",Router)

// app.get('/book',bookController.getBook);
// app.post('/book',bookController.postFavorite)
// app.delete('/book/:id',bookController.deleteFavorite)


app.get('/', (req, res) => {
  res.send('Backend Active');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
