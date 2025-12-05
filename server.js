import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

const app = express();
const port = 3000;

/**
 * Configuration for Google Generative AI (Gemini).
 * @type {GoogleGenerativeAI}
 */
const genAI = new GoogleGenerativeAI("AIzaSyDrTO1wFAujqGSMmyRcTGpB21NQ_PQpTV4");

/**
 * The Gemini model instance.
 * @type {GenerativeModel}
 */
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

/**
 * Rate limiter for the Chat API.
 * Limits requests to 5 per minute per IP.
 */
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit to 5 requests per IP
    message: { reply: "Doucement ! Philoute a besoin de repos. (Trop de requêtes)" },
    standardHeaders: true,
    legacyHeaders: false,
});

// 2. Configuration d'EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('public'));
app.use(express.json()); // To parse JSON bodies

/**
 * API Route for Philoute Chatbot.
 * Handles user messages, validates input, and generates a response using Gemini.
 * 
 * @name POST /api/chat
 * @function
 * @memberof module:routes
 * @param {string} req.body.message - The user's message.
 * @returns {JSON} The chatbot's reply or an error message.
 */
app.post('/api/chat',
    chatLimiter,
    body('message').trim().isLength({ min: 1, max: 500 }).escape(), // Validation: not empty, max 500 chars, XSS escape
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

/**
 * Object tracking the user's progress in the game.
 * @type {Object}
 */
let userProgress = {
    nirdIntroCompleted: false,
    nirdVisited: false, // New flag for animation
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

// ROUTES

/**
 * Home page route.
 * Renders the village view with current progress.
 * @name GET /
 */
app.get('/', (req, res) => {
    res.render('village', { progress: userProgress });
});

/**
 * NIRD Intro route.
 * Marks NIRD as visited.
 * @name GET /nird-intro
 */
app.get('/nird-intro', (req, res) => {
    userProgress.nirdVisited = true; // Stops blinking upon visit
    res.render('nird-intro');
});

/**
 * Validate NIRD route.
 * Marks NIRD intro as completed and redirects to home.
 * @name GET /valider-nird
 */
app.get('/valider-nird', (req, res) => {
    userProgress.nirdIntroCompleted = true;
    res.redirect('/');
});

// Building Routes

/**
 * Library route.
 * Marks Jalon 3 as completed.
 * @name GET /bibliotheque
 */
app.get('/bibliotheque', (req, res) => {
    userProgress.jalon3Completed = true; // Stops blinking
    res.render('bibliotheque');
});

/**
 * School route.
 * Marks exam as passed (simulated).
 * @name GET /ecole
 */
app.get('/ecole', (req, res) => {
    userProgress.examenReussi = true; // Stops blinking
    res.render('ecole');
});

/**
 * Military Base route.
 * Marks base as visited.
 * @name GET /base-militaire
 */
app.get('/base-militaire', (req, res) => {
    userProgress.baseMilitaireVisited = true; // Stops blinking
    res.render('base-militaire');
});

/**
 * Fortune Teller route.
 * Marks house as visited.
 * @name GET /voyante
 */
app.get('/voyante', (req, res) => {
    userProgress.maisonVoyanteVisited = true; // Stops blinking
    res.render('voyante');
});

/**
 * Cinema route.
 * Marks cinema as visited.
 * @name GET /cinema
 */
app.get('/cinema', (req, res) => {
    userProgress.cinemaVisited = true; // Stops blinking
    res.render('cinema');
});

app.get('/exam-success', (req, res) => {
    res.render('exam-success');
});

app.get('/exam-failure', (req, res) => {
    res.render('exam-failure');
});

// Snake Route (Hidden)
app.get('/snake', (req, res) => {
    res.render('snake');
});

// Menu Routes
app.get('/credits', (req, res) => {
    res.render('credits');
});

// CONTACT ROUTE — USING EMAILJS
app.get('/contact', (req, res) => {
    res.render('contact', {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID
    });
});

app.listen(port, () => {
    console.log(`Serveur NIRD démarré sur http://localhost:${port}`);
});
