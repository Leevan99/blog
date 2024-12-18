exports.get = (req,res,next)=>{
    res.render('registrati')
}


exports.post = (req,res,next)=>{
    let message
    if(req.email){
        message = "Email già registrata, Riprova."
    }else if(req.username){
        message = "Username già in uso, Riprova."
    }else{
        res.redirect('/login')
    }
    res.render('registrati', {message})
}