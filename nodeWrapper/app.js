const apiCallFromNode = require('./apiController')

const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    
    let urlObj = url.parse(req.url, true);
    let id = urlObj.pathname.split("/")[2];

    if (urlObj.path === '/') {
        apiCallFromNode.getAllProducts(function(response){
            res.write(response);
            res.end();
        });
    } else if (urlObj.path === `/getById/${id}`) {

        console.log(`id within getById route: `, id);

        apiCallFromNode.getProductById(id, function(response){
            res.write(response);
            res.end();
        });
    } else if (urlObj.path === '/addProduct') {
        apiCallFromNode.addProduct(function(response){
            // console.log(`response in app.js: `,response);
            // res.write(response);
            // res.end();
        });
    } else if (urlObj.path === `/updateProduct/${id}`) {
        apiCallFromNode.updateProduct(id, function(response){
            res.write(response);
            res.end();

        });
    } else if (urlObj.path === '/deleteProduct') {
        apiCallFromNode.deleteProduct(function(response){
            // res.write(response);
            // res.end();
        });
    }

        // res.end();
}).listen(3000);

console.log("service running on 3000 port....");