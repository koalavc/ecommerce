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

// exports.getProductById = (id, callback) => {
//     console.log(`id within the NodeJSCall`, id);
//     http.get(_EXTERNAL_URL_GET + id, (response) => {

//         // const myURL = new URL(_EXTERNAL_URL_GET + id);
//         let data = '';

//         response.on('data', (chunk) => {
//             data += chunk;
//         });

//         response.on('end', () => {
//             console.log(JSON.stringify(data));
//             return callback(data);
//         })
//     }).on('error', (err) => {
//         console.log(`Error: ${err.message}`);
//     })
// }

exports.getProductById = (id) => {
    return new Promise ((resolve, reject) => {
        http.get(_EXTERNAL_URL_GET + id, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => { data += chunk; });
        
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    return resolve(data);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (err) => {
            // console.log("Error: " + err.message);
            console.log(`Error: ${err.message}`);
        });
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
        console.log(`Status: ${response.statusCode}`);
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

exports.deleteProduct = (callback,id) => {

    const product = JSON.stringify(callback);
    console.log(`From deleteProduct`, product);
    const options = {
        hostname: 'localhost',
        port: 50518,
        path: _EXTERNAL_URL_GET + id,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(product)
        }
    }

    const req = http.request(options, (response) => {
        console.log(`Status: ${response.statusCode}`);
        console.log(`Headers: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            console.log(`Body: ${chunk}`);
        });
        response.on('end', () => {
            return response;
            // console.log('No more data in response.');
        });
    })
    
    req.on('error', (err) => {
        console.error(`problem with request: ${err.message}`);
    });

    req.write(product);
    req.end();
}

exports.updateProduct = (id) => {
    // const product = JSON.stringify(callback);

    const product = JSON.stringify({
        Title: 'Mega Man Battle Network',
        Price: 4000,
        ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Megamanbattlenetwork_boxshot.jpg/220px-Megamanbattlenetwork_boxshot.jpg',
        Description: 'Mega Man Battle Network is a video game developed by Capcom for the Game Boy Advance (GBA) handheld console. It is the first title of the Mega Man Battle Network series of games. It was originally released in Japan as a GBA launch game on March 21, 2001 and was released later that year in North America and Europe. It was also released via the Wii U Virtual Console in Japan on July 9, 2014, in Europe on July 24, 2014, and in North America on July 31, 2014.'
    });

    const options = {
        hostname: 'localhost',
        port: 50518,
        path: _EXTERNAL_URL_GET + id,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(product)
        }
    }

    const req = http.request(options, (response) => {
        console.log(`Status: ${response.statusCode}`);
        console.log(`Headers: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            console.log(`Body: ${chunk}`);
        });
        response.on('end', () => {
            return response;
            // console.log('No more data in response.');
        });
    });
    
    req.on('error', (err) => {
        console.error(`problem with request: ${err.message}`);
    });

    req.write(product);
    req.end();
}

// module.exports.callApi = callExternalApiUsingHttp;