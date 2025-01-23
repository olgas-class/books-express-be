const index = (req, res) => {
  res.json({
    message: "Index di libri",
  });
};

const show = (req, res) => {
  res.json({
    message: "Show del libro",
  });
};

module.exports = {
  index,
  show,
};
