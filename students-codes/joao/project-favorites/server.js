const http = require('http'); 
const path = require('path');
const fs = require('fs');

//Criação do servidor 
http.createServer((req, res) => { // => Arrow function, funções curta
    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file);

    // Captura da extensão do arquivo filePath
    const extname = path.extname(filePath);

    // Criação de um vetor com as extensões 
    const allowedFileTypes = ['.html', '.js', '.css']; 

    // Varrendo o vetor de extensões permitidas para tentar encontrar algum arquivo com extensão diferente das esperadas
    const allowed = allowedFileTypes.find(
        (item) => item === extname
    );

    // Se encontrou uma extensão não esperada, retorna somente para não travar a aplicação
    if(!allowed) return 

    fs.readFile(
        filePath,
        (err, content) => {
            if(err) throw err;
            res.end(content);
        }
    );

}).listen(5000, () => (console.log('Servidor online...')));



