const http = require("http");

//exemplo com chamadas estáticas das rotas
http
.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json'});

    if(req.url === '/auth'){
        res.end(JSON.stringify({
            user: 'Jonas',
            token: '8sdgs98go14faf$#@'
        }));
    }else if(req.url === '/users'){
        res.end(JSON.stringify({
            users: [
                {
                    id: 1,
                    name: 'Jonas'
                },
                {
                    id: 2,
                    name: 'Jorge'
                }
            ]
        }));
    }else{
        res.end(JSON.stringify({
            message: 'Invalid endpoint'
        }));
    }

    
})
.listen(8081, () => console.log("Server running on 8081"));