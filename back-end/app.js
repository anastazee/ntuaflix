const express = require('express');
const cors = require('cors');
const { openApiSpecification } = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const sampleRoutes = require('./routes/mainroutes');
const swaggerDocument = require('./swagger-output.json'); 
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
//app.use(bodyParser.raw({ type: 'text/plain' }));
//app.use(bodyParser.raw({ type: 'text/tab-separated-values' }));

//app.use(bodyParser.Buffer({ type: 'text/plain' }));
app.use(sampleRoutes);

app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(swaggerDocument)(req, res, next);
  });

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));  
app.use('/openapi-json',(req, res, next) => { res.status(200).json(openApiSpecification) } );
app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint not found' }) });

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      //console.error(err);
      return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
  next();
});
module.exports = app;