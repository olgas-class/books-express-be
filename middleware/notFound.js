const notFound = (req,res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Pagina non trovata"
  })
}

module.exports = notFound;