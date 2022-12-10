const { clear } = require('console')
const os = require('os') //CARREGANDO OS ARQUIVOS PARA DENTRO DO OBJETO
const log = require('./logger')

setInterval(() => {
    const { freemem, totalmem} = os //DESESTRUTURAÇÃO 

    const total = parseInt(totalmem()/1024/1024)
    const freeMem = parseInt(freemem()/1024/1024)
    const usage = total - freeMem 
    const percents = parseInt((usage/total) * 100)

    const stats = {
        total: `${total}`,
        freeMem: `${freeMem} MB`,
        percents: `${percents} % em uso`
    }
console.clear()
console.log('++++++MEMORY STATS++++++')
console.table(stats)

log('Rodando...', JSON.stringify(stats)) 

    }, 1000) 


//console.log(stats)
//console.log(`${parseInt(freemem()/1024/1024)}MB, ${parseInt(totalmem()/1024/1024)}MB`) 