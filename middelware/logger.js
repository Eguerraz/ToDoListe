const fs = require('fs');
const path = require('path');

function logger(req, res, next) {
  try {
    // 1️⃣ Créer le dossier logs/ si il n'existe pas
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    // 2️⃣ Créer le fichier du jour
    const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const logFile = path.join(logsDir, `${dateStr}.log`);
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, ''); // fichier vide
    }

    // 3️⃣ Écrire la ligne de log après que la réponse soit envoyée
    res.on('finish', () => {
      const logLine = `${req.ip} | ${req.method} | ${req.originalUrl} | ${res.statusCode}\n`;
      fs.appendFile(logFile, logLine, (err) => {
        if (err) console.error('Erreur écriture log:', err);
      });
    });

    next(); // passer à la route suivante
  } catch (err) {
    console.error('Erreur dans logger middleware:', err);
    next();
  }
}

module.exports = logger;
