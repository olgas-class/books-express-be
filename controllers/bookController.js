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
  const slug = req.params.slug;

  const sql = `
    SELECT books.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
    FROM books
    LEFT JOIN reviews
    ON reviews.book_id = books.id
    WHERE books.slug = ?
  `;

  const sqlReviews = `
    SELECT reviews.* 
    FROM reviews
    JOIN books
    ON books.id = reviews.book_id
    WHERE books.slug = ?
  `;

  dbConnection.query(sql, [slug], (err, results) => {
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
    dbConnection.query(sqlReviews, [slug], (err, reviews) => {
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

const storeReview = (req, res, next) => {
  const bookId = req.params.id;
  const { name, vote, text } = req.body;
  console.log(name, vote, text, bookId);

  // Validation
  if (isNaN(vote) || vote < 0 || vote > 5) {
    return res.status(400).json({
      status: "fail",
      message: "Il voto deve essere valore numerico compreso tra 0 e 5",
    });
  }

  if(name.length <= 3) {
    return res.status(400).json({
      status: "fail",
      message: "Il nome deve essere più lungo di 3 caratteri",
    });
  } 

  if(text && text.length > 0 && text.length < 5) {
    return res.status(400).json({
      status: "fail",
      message: "Il testo deve essere lungo almeno 6 caratteri",
    });
  }

  // Prima di fare la query di inserimento, ci assicuriamo che il libro con il dato id esiste
  const bookSql = `
    SELECT *
    FROM books
    WHERE id = ?
  `;

  dbConnection.query(bookSql, [bookId], (err, results) => {
    if (err) {
      return next(new Error("Errore interno  del server"));
    }
    if (results.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Libro non trovato",
      });
    }

    // Se è andato tutto bene e illibro esiste, possiamo aggiungere la recensione
    const sql = `
    INSERT INTO reviews(book_id, name, vote, text)
    VALUES (?, ?, ?, ?);
  `;

    dbConnection.query(sql, [bookId, name, vote, text], (err, results) => {
      if (err) {
        return next(new Error(err.message));
      }

      res.status(201).json({
        status: "success",
        message: "Recensione aggiunta",
      });
    });
  });
};

const store = (req, res, next) => {
  console.log("Salvataggio di un libro");
};

module.exports = {
  index,
  show,
  store,
  storeReview,
};
