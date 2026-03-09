const http = require('http');
const fs = require('fs');
const path = require('path');
const { evaluate } = require('mathjs');

const PORT = 3000;

const server = http.createServer((req, res) => {

    // Serve HTML
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // Serve JS
    else if (req.method === 'GET' && req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    }

    // API calculation
    else if (req.method === 'POST' && req.url === '/calculate') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            try {
                const { expression } = JSON.parse(body);
                const result = evaluate(expression);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result }));

            } catch (err) {

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ result: "Error" }));

            }

        });
    }

    else {
        res.writeHead(404);
        res.end("Not Found");
    }

});

server.listen(PORT, () => {
    console.log(`Calculator running at http://localhost:${PORT}`);
});