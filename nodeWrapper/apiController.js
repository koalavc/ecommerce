const https = require('https');
const http = require('http');
const url = require('url');

_EXTERNAL_URL = 'http://localhost:50518/api/product'
_EXTERNAL_URL_GET = `http://localhost:50518/api/product/`

exports.getAllProducts = (callback) => {
    http.get(_EXTERNAL_URL, (resp) => {
        let data = '';
    
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return callback(data);
        // console.log(JSON.stringify(data));
        });
    }).on("error", (err) => {
        // console.log("Error: " + err.message);
        console.log(`Error: ${err.message}`);
    });
}

exports.getProductById = (id, callback) => {
    console.log(`id within the NodeJSCall`, id);
    http.get(_EXTERNAL_URL_GET + id, (response) => {

        // const myURL = new URL(_EXTERNAL_URL_GET + id);
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            return callback(data);
        })
    }).on('error', (err) => {
        console.log(`Error: ${err.message}`);
    })
}

exports.addProduct = (callback) => {
    
    const product = JSON.stringify({
        Title: 'hello from node',
        Price: 20,
        ImageUrl: 'https://server.emulator.games/images/neo-geo/king-of-fighters-98.jpg',
        Description: 'the final test from node'
    })

    const options = {
        hostname: 'localhost',
        port: 50518,
        path: _EXTERNAL_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(product)
        }
    }

    const req = http.request(options, (response) => {
        console.log(`Status: ${response.statuscode}`);
        console.log(`Headers: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            console.log(`Body: ${chunk}`);
        });
        response.on('end', () => {
            return callback(response);
            // console.log('No more data in response.');
        });
    })
    
    req.on('error', (err) => {
        console.error(`problem with request: ${err.message}`);
    });

    req.write(product);
    req.end();
    
}

// module.exports.callApi = callExternalApiUsingHttp;