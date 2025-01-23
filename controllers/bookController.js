const dbConnection = require("../data/dbConnection");

const index = (req, res, next) => {
  const sql = "SELECT * FROM `books`";

  dbConnection.query(sql, (err, books) => {
    if (err) {
      return next(new Error(err.message));
    }

    return res.status(200).json({
      status: "success",
      data: books,
    });
  });
};

const show = (req, res, next) => {
  const id = req.params.id;

  const sql = "SELECT * FROM bookss WHERE id = ?";
  const sqlReviews = `
    SELECT reviews.* 
    FROM reviews
    JOIN books
    ON books.id = reviews.book_id
    WHERE books.id = ?
  `;

  dbConnection.query(sql, [id], (err, results) => {
    if (err) {
      return next(new Error("Errore interno del server"));
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
        return next(new Error("Errore interno del server"));
      }

      return res.status(200).json({
        status: "success",
        data: {
          ...results[0],
          reviews,
        },
      });
    });
  });
};

module.exports = {
  index,
  show,
};
