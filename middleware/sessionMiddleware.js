exports.auth = (req,res,next)=>{
    if(req.session.auth){
        res.redirect('/')
    }else{
        next()
    }
}

exports.initAuth = (req, res, next) => {
    if (!req.session.auth) {
        req.session.auth = false;
    }
    next();
}

exports.admin = (req,res,next)=>{
    if(!req.session.auth){
        res.redirect('/login')
    }else{
        next()
    }
}