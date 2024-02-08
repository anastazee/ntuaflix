const express = require('express');
const cors = require('cors');
const { openApiSpecification } = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const sampleRoutes = require('./routes/mainroutes');
const swaggerDocument = require('./swagger-output.json'); 
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sampleRoutes);

app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(swaggerDocument)(req, res, next);
  });

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));  
app.use('/openapi-json',(req, res, next) => { res.status(200).json(openApiSpecification) } );
app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint not found' }) });

module.exports = app;