const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'luca',
    password: 'Luca.99',
    database: 'blog'
})

const queryArticoli = 'SELECT * FROM articoli'


exports.articles = (req,res,next)=>{db.execute(queryArticoli, (err, results)=>{
    if(err) {
        console.log(err)
        next(err)
    }
    req.articles = results
    next()
})}