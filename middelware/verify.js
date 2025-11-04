const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    try {
        const bearer = req.headers['authorization'];

        if (!bearer || !bearer.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token manquant ou mal formaté' });
        }

        const token = bearer.split(' ')[1];

        jwt.verify(token, process.env.JWT_PRIVATE_TOKEN, (err, payload) => {
            if (err) {
                console.error("Erreur JWT :", err);
                return res.status(401).json({ error: 'Token invalide ou expiré' });
            }

            // Stocke le contenu du token dans la requête (utile pour les routes)
            req.user = payload;

            console.log("Token valide :", payload);
            next(); // Passe au middleware/route suivant
        });

    } catch (error) {
        console.error("Erreur dans verifyToken :", error);
        return res.status(500).json({ error: 'Erreur serveur lors de la vérification du token' });
    }
}

module.exports = verifyToken;
