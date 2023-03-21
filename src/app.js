const express = require('express');

const app = express();

const productsController = require('./controllers/products');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', productsController.findById);

app.get('/products', productsController.findAll);

app.use(errorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;