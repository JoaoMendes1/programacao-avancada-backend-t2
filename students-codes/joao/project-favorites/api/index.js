// Realizando importação dos módulos necessários.
const http = require('http');
const URL = require('url'); 
const fs = require('fs');
const path = require('path'); 

// Importação das URLS do doc urls.json - Sendo armazenado em data.
const data = require('./urls.json');

/*=============================== Iniciando o servidor na porta 3000 ===================================== */
http.createServer((req, res) => {

       // Desestruturando a query string da URL.
       const {name, url, del} = URL.parse(req.url, true).query;

       res.writeHead(200, {
           'Access-Control-Allow-Origin': '*'
       })

    function writeFile(cb) {
        fs.writeFile(
            path.join(__dirname, 'urls.json'),
            JSON.stringify(data, null, 2),
            err => {
                if (err) throw err
                cb('Operação realizada com sucesso!');
            }
        );
    }

    // Exibir o conteúdo JSON. 
    if (!name || !url)
        return res.end(JSON.stringify(data));

    // Deletar o conteúdo JSON. 
    if (del) {
        data.urls = data.urls.filter(item => item.url != url)
        
        return writeFile(() => res.end('Link deletado com sucesso!'))
    }

    data.urls.push({name, url})
    
    return writeFile(() => res.end('Link criado com sucesso!'))
    
}).listen(3000, () => console.log("API is running")); 
