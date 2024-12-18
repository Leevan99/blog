exports.registrati = require('./registrati')


exports.homepage = (req, res, next)=>{
    const articles = req.articles
    const admin = req.session.auth
    const message = req.session.message
    delete req.session.message
    res.render('homepage', {articles, admin, message})
}


exports.articolo = (req, res, next) => {
    const article = req.article[0]
    const admin = req.session.auth
    res.render('articolo', {article, admin})
}


exports.login = (req,res,next)=>{
    res.render('login')
}

exports.logout = (req,res)=>{
    if (req.session.auth){
        req.session.destroy()
        return res.render('logout')
    }
    return res.redirect('/')
}

exports.posta = (req,res,next)=>{
    const admin = req.session.auth
    res.render('posta', {admin})
}

