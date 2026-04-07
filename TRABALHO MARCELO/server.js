const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.use(express.static('public'));


app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});


app.get('/aluno1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'aluno1.html'));
});


app.get('/aluno2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'aluno2.html'));
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'erro.html'));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'views', 'erro.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Páginas disponíveis:');
    console.log('- Home: http://localhost:3000/');
    console.log('- Aluno 1: http://localhost:3000/aluno1');
    console.log('- Aluno 2: http://localhost:3000/aluno2');
});