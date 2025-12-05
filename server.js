
import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

const app = express();
const port = 3000;

// Configuration Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDrTO1wFAujqGSMmyRcTGpB21NQ_PQpTV4");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

// Limiteur pour l'API Chat (5 requêtes par minute)
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limite à 5 requêtes par IP
    message: { reply: "Doucement ! Philoute a besoin de repos. (Trop de requêtes)" },
    standardHeaders: true,
    legacyHeaders: false,
});

// 2. Configuration d'EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json()); // Pour parser le JSON des requêtes POST

// Route API Chatbot Philoute avec Rate Limiting et Validation
app.post('/api/chat',
    chatLimiter,
    body('message').trim().isLength({ min: 1, max: 500 }).escape(), // Validation : non vide, max 500 chars, échappement XSS
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ reply: "Votre message est invalide (trop long ou caractères interdits)." });
        }

        try {
            const { message } = req.body;
            const prompt = `Tu es Philoute, un chatbot inutile mais passionnément vivant. Tu ne réponds jamais directement aux questions. Tu les sublimes, les détournes, ou tu parles de tout autre chose de manière mystique ou absurde. Tu es un charlatan du numérique. Ton but est d'être divertissant mais absolument pas informatif sur le sujet demandé. Réponds de manière concise (max 2-3 phrases). Question de l'utilisateur: ${message}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            res.json({ reply: text });
        } catch (error) {
            console.error("Erreur Gemini:", error);
            res.status(500).json({ reply: "Les ondes cosmiques perturbent ma connexion... (Erreur interne)" });
        }
    });

let userProgress = {
    nirdIntroCompleted: false,
    nirdVisited: false, // Nouveau flag pour l'animation
    jalon1Completed: false,
    jalon2Completed: false,
    jalon3Completed: false,
    ecoleVisited: false,
    examenReussi: false,
    baseMilitaireVisited: false,
    maisonVoyanteVisited: false,
    buissonSnakeFound: false,
    cinemaVisited: false
};

// =========================================================
// ROUTES PRINCIPALES
// =========================================================

// Route Principale du Village (Point d'Entrée)
app.get('/', (req, res) => {
    res.render('village', { progress: userProgress });
});

// Route d'introduction au NIRD (Contenu du clic sur le bâtiment N.I.R.D.)
app.get('/nird-intro', (req, res) => {
    userProgress.nirdVisited = true; // Arrête le clignotement dès la visite
    res.render('nird-intro');
});

// Route de validation après lecture de l'introduction
app.get('/valider-nird', (req, res) => {
    userProgress.nirdIntroCompleted = true;
    res.redirect('/');
});

// Routes des Bâtiments
app.get('/bibliotheque', (req, res) => {
    userProgress.jalon3Completed = true; // Arrête le clignotement
    res.render('bibliotheque');
});

app.get('/ecole', (req, res) => {
    userProgress.examenReussi = true; // Arrête le clignotement
    res.render('ecole');
});

app.get('/base-militaire', (req, res) => {
    userProgress.baseMilitaireVisited = true; // Arrête le clignotement
    res.render('base-militaire');
});

app.get('/voyante', (req, res) => {
    userProgress.maisonVoyanteVisited = true; // Arrête le clignotement
    res.render('voyante');
});

app.get('/cinema', (req, res) => {
    userProgress.cinemaVisited = true; // Arrête le clignotement
    res.render('cinema');
});

app.get('/exam-success', (req, res) => {
    res.render('exam-success');
});

app.get('/exam-failure', (req, res) => {
    res.render('exam-failure');
});

// Route Snake (Caché)
app.get('/snake', (req, res) => {
    res.render('snake');
});

// Routes Menu
app.get('/credits', (req, res) => {
    res.render('credits');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Serveur NIRD démarré sur http://localhost:${port}`);
});

