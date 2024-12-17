exports.articolo = require('./articolo')


exports.homepage = (req, res, next)=>{
    const articles = req.articles
    res.render('homepage', {articles})
}