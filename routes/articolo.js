exports.articolo = (req, res, next) => {
    const article = req.article[0]
    res.render('articolo', {article})
}
