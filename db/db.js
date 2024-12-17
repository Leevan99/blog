const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'luca',
    password: 'Luca.99',
    database: 'blog'
})

const queryArticoli = `
SELECT * 
FROM articoli
ORDER BY idArticoli DESC`

const queryArticolo = `
SELECT * 
FROM articoli
WHERE idArticoli = ?`


exports.articles = (req,res,next)=>{
    db.execute(queryArticoli, (err, results)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.articles = results
    next()
})}

exports.article = (req,res,next)=>{
    const {id} = req.params
    db.execute(queryArticolo, [id], (err, result)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.article = result
    next()
})}