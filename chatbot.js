import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { body, validationResult } from 'express-validator';
import 'dotenv/config';

const router = express.Router();

// Configuration Gemini
// Utilisation de la clé API définie dans le fichier .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// On utilise le modèle gemini-pro qui est le standard stable
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

// Route API Chatbot Philoute
router.post('/chat', 
    // Validation et nettoyage des entrées
    body('message').trim().isLength({ min: 1 }).escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ reply: "Votre message est vide ou invalide." });
        }

        try {
            const { message } = req.body;

        const prompt = `Tu es Philoute, un chatbot inutile mais passionnément vivant.
        Tu ne réponds jamais directement aux questions. Tu les sublimes, les détournes, 
        ou tu parles de tout autre chose de manière mystique ou absurde. 
        Tu es un charlatan du numérique. Ton but est d'être divertissant 
        mais absolument pas informatif sur le sujet demandé. 
        Réponds de manière concise (max 2-3 phrases). 
        Question de l'utilisateur: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error("Erreur Gemini:", error);
        // Gestion spécifique de l'erreur 404 (Modèle non trouvé) pour aider au débogage
        if (error.message && error.message.includes("404")) {
             res.status(500).json({ reply: "Mon esprit est embrumé... (Erreur: Modèle Gemini introuvable. Vérifiez le nom du modèle dans chatbot.js)" });
        } else {
             res.status(500).json({ reply: "Les ondes cosmiques perturbent ma connexion... (Erreur interne)" });
        }
    }
});

export default router;
