// ./src/index.js

//importing the dependencies
const { app, startDatabase, getProducts, deleteProduct, updateProduct, createProduct} = require('./app-common.js')


// endpoint to return all products
// sets up the handler for requests to "/"
// much like a switch statement
app.get('/', async (req, res) => {
  res.send(await getProducts());
});

// we name our parameters apiRequest and apiResponse here but
// there is no strong reason these variables could not be named `req` and `res` or `request` and `response`
// the reason for this naming is so we are thinking about "api" tonight
app.post('/', async (apiRequest, apiResponse) => {
  const newProduct = apiRequest.body;
  await createProduct(newProduct);
  apiResponse.send({ message: 'New product created.' });
});

// endpoint to delete a product
app.delete('/:productId', async (apiRequest, apiResponse) => {
  await deleteProduct(apiRequest.params.productId);
  apiResponse.send({ message: 'Product deleted.' });
});

// endpoint to update a product
app.put('/:id', async (apiRequest, apiResponse) => {
  const updatedProduct = apiRequest.body;
  console.log({updatedProduct})
  await updateProduct(apiRequest.params.id, updatedProduct);
  apiResponse.send({ message: 'Product updated.' });
});

// start the in-memory MongoDB instance first
// https://www.mongodb.com/
startDatabase().then(async () => {
  await createProduct({title: 'In-memory mongo database for debugging and testing is now running!'});

  // start the server after the database starts
  app.listen(3001, async () => {
    console.log('Web server has started on port 3001 http://localhost:3001');
  });
});
