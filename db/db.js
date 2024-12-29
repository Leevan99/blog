const mysql = require('mysql2')
const query = require('./dbQuery')
const bcrypt = require('bcrypt')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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
            bcrypt.hash(password, 10, (err, hashPassword)=>{
                if(err) next(err)
                db.execute(query.queryRegistrazione, [nome, cognome, username, email, hashPassword], (err, result)=>{
                    if (err) next(err)
                    req.session.message = 'Registrazione avvenuta con successo!<br>Effettua il login.'
                    next()
                })
            })
        }
    })
}


exports.checkAndLogin = (req,res,next)=>{
    const {username, password} = req.body
    db.execute(query.queryLogin, [username, username], (err, result)=>{
        if(err){
            next(err)
        }else if(result[0] && bcrypt.compareSync(password, result[0].password, (err, result)=>{return result})){
            req.session.auth = true
            req.session.idUtente = result[0].idUtente
            req.session.username = result[0].username
            req.session.nome = result[0].nome
            req.session.cognome = result[0].cognome
            req.session.email = result[0].email
            return res.redirect('/')
        }else{
            req.message='Username o password errati!'
        }
        next()
    })
}


exports.posta = (req,res,next)=>{
    const {titolo, corpo} = req.body
    const autore = req.session.nome + " " + req.session.cognome
    db.execute(query.queryPost, [titolo, corpo, autore, req.session.idUtente, req.body.immagine], (err,result)=>{
        if(err) {
            next(err)
        }
    })
    req.session.message = 'Post pubblicato correttamente!'
    res.redirect('/')
}

exports.articlesUtente = (req,res,next)=>{
    db.execute(query.queryArticoliUtente, [req.session.idUtente], (err, results)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.articlesUtente = results
    next()
})}


exports.deleteArticle = (req,res,next)=>{
    const {id} = req.params
    db.execute(query.queryDelete, [id], (err, result)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.session.message = 'Articolo eliminato!'
    res.json({ success: true})
    })
}

exports.putArticolo = (req,res,next)=>{
    const {idArticoli, titolo, corpo} = req.body
    db.execute(query.queryAggiorna, [titolo, corpo, idArticoli], (err, result)=>{
        if(err) {
            console.log(err)
            next(err)
        }
    })
    req.session.message = 'Articolo aggiornato!'
    res.redirect('/admin/dashboard')
}

exports.publish = (req,res,next)=>{
    const {id} = req.params
    let publish = true
    db.execute(query.queryArticolo, [id], (err, result)=>{
        if(err) {
            console.log(err)
            next(err)
        }
        if(result[0].publish)
            publish = false          
        db.execute(query.queryPublish, [publish, id], (err)=>{
            if(err) {
                console.log(err)
                next(err)
            }
            finalizeUpdate(req, res, publish)
        })
    })
}

const finalizeUpdate = (req, res, publish) => {
    req.session.message = 'Articolo ' + (publish ? "pubblicato" : "nascosto")
    res.redirect('/admin/dashboard')
};

