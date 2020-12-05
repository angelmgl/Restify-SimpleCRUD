'use strict'

const restify = require('restify');
const server = restify.createServer();

//settings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const users = {
    1: {
        name: 'Juan',
        lastName: 'Perez'
    },
    2: {
        name: 'Ana',
        lastName: 'Cruz'
    }
};

let usersCount = 2;

//routes
server.get('/user', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});

server.get('/user/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
});

server.post('/user', (req, res, next) => {
    let newUser = req.body;
    usersCount++;
    newUser.id = usersCount;
    users[newUser.id] = newUser;
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(newUser));
});

server.put('/user/:id', (req, res, next) => {
    const user = users[parseInt(req.params.id)];
    const update = req.body;
    for(let field in update) {
        user[field] = update[field]
    }
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(user));
});

server.del('/user/:id', (req, res, next) => {
    delete users[parseInt(req.params.id)];
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
});
//start server
server.listen(3000, () => {
    console.log('server on port 3000');
});