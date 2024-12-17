


exports.homepage = (req, res, next)=>{
    const articles = req.articles
    res.render('homepage', {pageTitle: "homepage", articles})
}