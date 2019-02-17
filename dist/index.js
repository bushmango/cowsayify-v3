"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { createServer } from 'http'
// import { parse } from 'url'
const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(`> Starting Port: ${port} Dev: ${'' + dev}`);
app.prepare().then(() => {
    const server = express();
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    // server.get('/b', (req, res) => {
    //   return app.render(req, res, '/a', req.query)
    // })
    server.get('/posts/:id', (req, res) => {
        return app.render(req, res, '/posts', { id: req.params.id });
    });
    server.get('/api/save', (req, res) => {
        return res.send('api ok');
    });
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, err => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
    // createServer((req, res) => {
    //   const parsedUrl = parse(req.url, true)
    //   const { pathname, query } = parsedUrl
    //   if (pathname === '/a') {
    //     app.render(req, res, '/a', query)
    //   } else if (pathname === '/b') {
    //     app.render(req, res, '/b', query)
    //   } else {
    //     handle(req, res, parsedUrl)
    //   }
    // }).listen(port, err => {
    //   if (err) throw err
    //   console.log(`> Ready on http://localhost:${port}`)
    // })
});
//# sourceMappingURL=index.js.map