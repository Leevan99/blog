const express = require("express")
const http = require("http")
const routes = require("./routes")
const path = require("path")
const db = require('./db/db')
const middleware = require('./middleware/sessionMiddleware')
const session = require("express-session")
require('dotenv').config()
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, 'public/img'), // Percorso fisso
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName); // Salva il file con un nome unico
            req.body.immagine = uniqueName;
        }
    })
})



const app = express()
const port = process.env.port || 3000


app.locals.appTitle = "Our blog"

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 30 * 60 * 1000,
        secure: false,
        httpOnly: true    
    }
}))

app.use(middleware.initAuth);


app.use('/login', middleware.auth)
app.use('/registrati', middleware.auth)
app.use('/admin', middleware.admin)
app.use('/api', middleware.admin)

app.get('/', db.articles, routes.homepage)
app.get('/articolo/:id', db.article, routes.articolo)

app.get('/registrati', routes.registrati.get)
app.post('/registrati', db.checkAndInsert, routes.registrati.post)

app.get('/login', routes.login)
app.post('/login', db.checkAndLogin, routes.login)

app.get('/admin/post', routes.posta)
app.post('/admin/post', upload.single('immagine'), db.posta)

app.get('/admin/dashboard', db.articlesUtente, routes.dashboard)
app.delete('/api/elimina/:id', db.deleteArticle)
app.post('/admin/dashboard', db.putArticolo)
app.put('/api/publish/:id', db.publish)


app.get('/admin/articolo/:id', db.article, routes.putArticolo)



app.get('/logout', routes.logout)


const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server in ascolto sulla porta: ${port}`)
})
