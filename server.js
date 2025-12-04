
import express from 'express';
const app = express();
const port = 3000;

// 2. Configuration d'EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

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
    buissonSnakeFound: false
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

// Routes Menu
app.get('/credits', (req, res) => {
    res.render('credits');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// =========================================================
// Lancement du serveur
// =========================================================
app.listen(port, () => {
    console.log(`Serveur NIRD démarré sur http://localhost:${port}`);
});

