const express = require("express");
const booksRouter = require("./routers/books");
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");
const cors = require("cors");

// creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;

// Middleware delle CORS
app.use(cors({
  origin: process.env.FRONTENT_URL
}))

// Middleware per rendere la cartella pubblica accessibile da fuori
app.use(express.static('public'));

// DEFINISCO I GRUPPI DELLE ROTTE
app.use("/books", booksRouter);

// REGISTRO ERRORS HANDLER MIDDLEWARE
app.use(errorsHandler);

// Middleware della rotta non esistente
app.use(notFound)

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
