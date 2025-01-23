const dbConnection = require("../data/dbConnection");

const index = (req, res) => {
  const sql = "SELECT * FROM `books`";

  dbConnection.query(sql, (err, books) => {
    if (err) {
      const resObj = {
        status: "fail",
        message: "Errore interno del server",
      };
      if (process.env.ENVIRONMENT === "development") {
        resObj.detail = err.stack;
      }
      return res.status(500).json(resObj);
    }

    return res.status(200).json({
      status: "success",
      data: books,
    });
  });
};

const show = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM books WHERE id = ?";
  const sqlReviews = `
    SELECT reviews.* 
    FROM reviews
    JOIN books
    ON books.id = reviews.book_id
    WHERE books.id = ?
  `;

  dbConnection.query(sql, [id], (err, results) => {
    if (err) {
      const resObj = {
        status: "fail",
        message: "Errore interno del server",
      };
      if (process.env.ENVIRONMENT === "development") {
        resObj.detail = err.stack;
      }
      return res.status(500).json(resObj);
    }

    // Controllare se la corrispondeza è stata trovata
    if (results.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Libro non trovato",
      });
    }

    // Nel caso tutto ok, prendiamo anche le recensioni collegati a questo libro
    dbConnection.query(sqlReviews, [id], (err, reviews) => {
      if (err) {
        const resObj = {
          status: "fail",
          message: "Errore interno del server",
        };
        if (process.env.ENVIRONMENT === "development") {
          resObj.detail = err.stack;
        }
        return res.status(500).json(resObj);
      }

      return res.status(200).json({
        status: "success",
        data: {
          ...results[0],
          reviews
        }
      })
    });
  });
};

module.exports = {
  index,
  show,
};
