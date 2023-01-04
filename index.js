const swaggerUi = require('swagger-ui-express');
const express = require('express');
const talkerRoute = require('./routes/talker');
const loginRoute = require('./routes/login');

const swaggerDocs = require('./swagger.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/login', loginRoute);
app.use('/talker', talkerRoute);

app.listen(PORT, () => {
  console.log('Online');
});
