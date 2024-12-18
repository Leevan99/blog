exports.articolo = require('./articolo')
exports.registrati = require('./registrati')
exports.login = require('./login')


exports.homepage = (req, res, next)=>{
    const articles = req.articles
    const admin = req.session.auth
    res.render('homepage', {articles, admin})
}

exports.logout = (req,res)=>{
    if (req.session.auth){
        req.session.destroy()
        return res.render('logout')
    }
    return res.redirect('/')
}