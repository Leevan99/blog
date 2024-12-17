const express = require("express")
const http = require("http")
const routes = require("./routes")
const path = require("path")
const db = require('./db/db')



const app = express()
const port = process.env.port || 3000

app.locals.appTitle = "Our blog"

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))





app.get('/', db.articles, routes.homepage)
app.get('/articolo/:id', db.article, routes.articolo.articolo)

const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server in ascolto sulla porta: ${port}`)
})
