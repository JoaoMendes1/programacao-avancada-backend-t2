// Importação dos módulos.
const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

// Importação do documento urls.json. Nesse momento do código, o conteúdo do documento vai para o objeto data.
const data = require('./urls.json')

// Servidor rodando na porta 3000.
http.createServer((req, res) => {

    // Desestruturação da query string da URL para obter os valores que estão associados às chaves name, url e del.
    const { name, url, del } = URL.parse(req.url, true).query

    // Mostrar o conteúdo do JSON.
    if (!name || !url)
        return res.end('show')

    // Delete - apagar do JSON.
    if (del) {
        return res.end('delete')
    }

    return res.end('create')

}).listen(3000, () => console.log('Api is running.'))