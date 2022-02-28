// dependencies
const router = require('express').Router();
const path = require('path');

// this is the first route preceding other routes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// if there is no matching route then default to the home page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
