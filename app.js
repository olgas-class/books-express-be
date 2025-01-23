const express = require("express");
const booksRouter = require("./routers/books");
const errorsHandler = require("./middleware/errorsHandler");

// creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;

// DEFINISCO I GRUPPI DELLE ROTTE
app.use("/books", booksRouter);


// REGISTRO ERRORS HANDLER MIDDLEWARE
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
