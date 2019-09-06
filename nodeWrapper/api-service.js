const https = require('https');
const http = require('http');
const url = require('url');

_EXTERNAL_URL = 'http://localhost:50518/api/product'
_EXTERNAL_URL_GET = `http://localhost:50518/api/product/`

/*
    The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
*/ 
exports.getAllProducts = async () => {
    /*
        The keyword await makes JavaScript wait until that promise settles and returns its result.
    */ 
    return await new Promise ((resolve, reject) => {
        http.get(_EXTERNAL_URL, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                try {
                    return resolve(data);
                }
                catch (e){
                    console.error(e.message);
                }
            // console.log(JSON.stringify(data));
            });
        }).on("error", (err) => {
            console.log(`Error: ${err.message}`);
        });
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

exports.addProduct = () => {
    const product = JSON.stringify({
        Title: 'Mega Man Battle Network 3 White',
        Price: 20,
        ImageUrl: 'https://vignette.wikia.nocookie.net/megaman/images/e/e3/MMBN3WhiteUSCover.jpg/revision/latest?cb=20130721232344',
        Description: 'Mega Man Battle Network 3 is a video game developed by Capcom for the Game Boy Advance (GBA) handheld game console. It is the third game in the Mega Man Battle Network series, released in 2002 in Japan and 2003 in North America. While in North America and Europe, two complementary versions of the game - Blue and White - exist, marketed simultaneously, this was not the case in Japan. The game was released in a single version in this region, while a Black version containing bugfixes, new areas, optional bosses, and other improvements, was released some months after the original. It was released on the Wii Us Virtual Console in Japan on December 17, 2014 and in North America on May 14, 2015.'
    });

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

    return new Promise ((resolve, reject) => {
        const req = http.request(options, (response) => {
            console.log(`Status: ${response.statusCode}`);
            console.log(`Headers: ${JSON.stringify(response.headers)}`);
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                // console.log(`Body: ${chunk}`);
            });
            response.on('end', () => {
                // console.log(`the response`,response);
                return resolve(response);
                // console.log('No more data in response.');
            });
        })
        
        req.on('error', (err) => {
            console.error(`problem with request: ${err.message}`);
        });
    
        req.write(product);
        req.end();
    })
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