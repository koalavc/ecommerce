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
        let test;
        http.get(_EXTERNAL_URL_GET + id, (resp) => {
            const getSingleProductPromise = new Promise ((resolve, reject ) => {
                
                    let data = '';
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => { data += chunk; });
                
                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        try {
                            const parsedData = JSON.parse(data);
                            console.log(`From getSingleProduct`, parsedData);
                            return resolve(data);
                        } catch (e) {
                            console.error(e.message);
                        }
                        return getSingleProductPromise;
                    });
            })
            .then(result => {
                test=result;
                console.log(`Test`,test);
            })
                
        }).on('error', (err) => {
            // console.log("Error: " + err.message);
            console.log(`Error: ${err.message}`);
        });

        
    } else if (urlObj.path === `/deleteProduct/${id}`) {
        let productToBeDeleted;
        http.get(_EXTERNAL_URL_GET + id, (resp) => {
            const getSingleProductPromise = new Promise ((resolve, reject ) => {
                
                    let data = '';
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => { data += chunk; });
                
                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        try {
                            const parsedData = JSON.parse(data);
                            // console.log(`From getSingleProduct`, parsedData);
                            return resolve(data);
                        } catch (e) {
                            console.error(e.message);
                        }
                        return getSingleProductPromise;
                    });
            })
            .then(result => {
                productToBeDeleted=result;
                apiCallFromNode.deleteProduct(productToBeDeleted, id);
            })
                
        }).on('error', (err) => {
            // console.log("Error: " + err.message);
            console.log(`Error: ${err.message}`);
        });
    }

        // res.end();
}).listen(3000);

console.log("service running on 3000 port....");