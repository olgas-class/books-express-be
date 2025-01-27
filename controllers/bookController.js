const dbConnection = require("../data/dbConnection");

const index = (req, res, next) => {
  // Prelevo query string params
  const filters = req.query;
  console.log(filters);

  let sql = "SELECT * FROM `books`";
  const params = [];
  const conditions = [];

  if (filters.search) {
    conditions.push("title LIKE ?");
    params.push(`%${filters.search}%`);
  }

  // if (filters.genre) {
  //   conditions.push("genre = ?");
  //   params.push(filters.genre);
  // }

  for (const key in req.query) {
    if (key !== "search") {
      conditions.push(`${key} = ?`);
      params.push(req.query[key]);
    }
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  dbConnection.query(sql, params, (err, books) => {
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

  const sql = `
    SELECT books.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
    FROM books
    LEFT JOIN reviews
    ON reviews.book_id = books.id
    WHERE books.id = ?
  `;

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
    if (results.length === 0 || results[0].id === null) {
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
