import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const port = 3000;

// Config EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Fichiers statiques
app.use(express.static('public'));

let userProgress = {
    nirdIntroCompleted: false,
    jalon1Completed: false,
    jalon2Completed: false,
    jalon3Completed: false,
    ecoleVisited: false,
    examenReussi: false,
    baseMilitaireVisited: false,
    maisonVoyanteVisited: false,
    buissonSnakeFound: false
};

// ROUTES
app.get('/', (req, res) => {
    res.render('village', { progress: userProgress });
});

app.get('/nird-intro', (req, res) => {
    res.render('nird-intro');
});

app.get('/valider-nird', (req, res) => {
    userProgress.nirdIntroCompleted = true;
    res.redirect('/');
});

app.get('/credits', (req, res) => {
    res.render('credits');
});

// ROUTE CONTACT — ON PASSE EMAILJS
app.get('/contact', (req, res) => {
    res.render('contact', {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateId: process.env.EMAILJS_TEMPLATE_ID
    });
});

// SERVEUR
app.listen(port, () => {
    console.log(`Serveur NIRD démarré sur http://localhost:${port}`);
});
