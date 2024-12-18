exports.articolo = require('./articolo')
exports.registrati = require('./registrati')


exports.homepage = (req, res, next)=>{
    const articles = req.articles
    res.render('homepage', {articles})
}