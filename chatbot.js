import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { body, validationResult } from 'express-validator';
import 'dotenv/config';

const router = express.Router();

/**
 * Configuration for Google Generative AI (Gemini).
 * Uses the API key defined in the .env file.
 * @type {GoogleGenerativeAI}
 */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * The Gemini model instance.
 * Uses 'gemini-2.0-flash-lite' model.
 * @type {GenerativeModel}
 */
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

/**
 * API Route for Philoute Chatbot.
 * Handles user messages, validates input, and generates a response using Gemini.
 * 
 * @name POST /chat
 * @function
 * @memberof module:routes
 * @param {string} req.body.message - The user's message.
 * @returns {JSON} The chatbot's reply or an error message.
 */
router.post('/chat', 
    // Validation and sanitization of inputs
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
            // Specific handling for 404 error (Model not found) to aid debugging
            if (error.message && error.message.includes("404")) {
                 res.status(500).json({ reply: "Mon esprit est embrumé... (Erreur: Modèle Gemini introuvable. Vérifiez le nom du modèle dans chatbot.js)" });
            } else {
                 res.status(500).json({ reply: "Les ondes cosmiques perturbent ma connexion... (Erreur interne)" });
            }
        }
    });

export default router;
