// dependencies
const express = require('express');

// point server to the route files
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// initialize an express server
const app = express();

// Set the PORT access
const PORT = process.env.PORT || 3001;

// pass in strings or data arrays
app.use(express.urlencoded({ extended: true }));

// pass in JSON data
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// server listener
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
});