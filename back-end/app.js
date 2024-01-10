const express = require('express');
const cors = require('cors');

const sampleRoutes = require('./routes/sampleroutes');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sampleRoutes);

app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint not found' }) });

module.exports = app;