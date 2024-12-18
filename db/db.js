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


exports.checkAndLogin = (req,res,next)=>{
    const {username, password} = req.body
    db.execute(query.queryLogin, [username, username], (err, result)=>{
        if(err){
            next(err)
        }else if(result[0] && result[0].password === password){
            req.session.auth = true
            req.session.idUtente = result[0].idUtente
            req.session.username = result[0].username
            req.session.nome = result[0].nome
            req.session.cognome = result[0].cognome
            req.session.email = result[0].email
            return res.redirect('/')
        }
        next()
    })
}


exports.posta = (req,res,next)=>{
    const {titolo, corpo} = req.body
    const autore = req.session.nome + " " + req.session.cognome
    db.execute(query.queryPost, [titolo, corpo, autore, req.session.idUtente], (err,result)=>{
        if(err) {
            next(err)
        }
    })
    req.session.message = 'Post pubblicato correttamente!'
    res.redirect('/')
}