exports.homepage = (req, res, next)=>{
    res.render('homepage', {pageTitle: "homepage", articles})
}