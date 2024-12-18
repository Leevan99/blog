const mysql = require('mysql2')
const query = require('./dbQuery')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'luca',
    password: 'Luca.99',
    database: 'blog'
})


exports.articles = (req,res,next)=>{
    db.execute(query.queryArticoli, (err, results)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.articles = results
    next()
})}

exports.article = (req,res,next)=>{
    const {id} = req.params
    db.execute(query.queryArticolo, [id], (err, result)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.article = result
    next()
})}


exports.checkAndInsert = (req,res,next)=>{
    const {nome, cognome, username, email, password} = req.body
    db.execute(query.queryControllo, [username, email], (err, result)=>{
        if(err){
            next(err)
        } else if (result[0]){
            if(result[0].email === email){
                req.email = true
                next()
            } else {
                req.username = true
                next()
            }
        }else {
            db.execute(query.queryRegistrazione, [nome, cognome, username, email, password], (err, result)=>{
                if (err) next(err)
                next()
            })
        }
    })
}