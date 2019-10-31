# Node Wrapper

This is a node wrapper for a .Net Core REST API. Have the .NET Core REST API up and running and you can hit the endpoints though Node.

### How to run
`node app.js`

### Endpoints

`localhost:3000/` - Get all products
`localhost:3000/getById/${id}` - Gets the Id of a single product
`localhost:3000/addProduct` - Add a single product
`localhost:3000/updateProduct/${id}` - Update a single product
`localhost:3000/deleteProduct/${id}` - Delete a single product
