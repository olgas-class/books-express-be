const multer = require("multer");

// Setto le impostazioni di salvataggio del file
const storage = multer.diskStorage({
  destination: (req, file, callbackFn) => {
    // Impostazine della posizione di slavataggio del file
    callbackFn(null, "public/images");
  },
  filename: (req, file, callbackFn) => {
    // Prenod il nome del file caricato
    const originalFileName = file.originalname;
    // Aggiungo il timestamp per assicurarmi che il nome non si ripete
    const uniqueName = `${Date.now()}-${originalFileName}`;
    callbackFn(null, uniqueName);
  },
});

// Creo l'istanza di multer passandogli le opzioni di salvataggio
const upload = multer({ storage });

module.exports = upload;
