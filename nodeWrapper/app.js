const apiService = require('./api-service')

const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true);
    let id = urlObj.pathname.split("/")[2];

    if (urlObj.path === '/') {
        apiService.getAllProducts(function(response){
            res.write(response);
            res.end();
        });
    } else if (urlObj.path === `/getById/${id}`) {
        console.log(`id within getById route: `, id);
        apiService.getProductById(id).then(result => {
            res.write(result);
            res.end();
        });
    } else if (urlObj.path === '/addProduct') {
        apiService.addProduct(function(response){
            // console.log(`response in app.js: `,response);
            // res.write(response);
            // res.end();
        });
    } else if (urlObj.path === `/updateProduct/${id}`) {
        apiService.updateProduct(id);
    } else if (urlObj.path === `/deleteProduct/${id}`) {
        apiService.getProductById(id).then(result => {
            console.log(`Product deleted: `, result);
            apiService.deleteProduct(result, id);
        });
    }

        // res.end();
}).listen(3000);

console.log("service running on 3000 port....");