const express = require("express")
const http = require("http")
const routes = require("./routes")
const path = require("path")

const app = express()
const port = process.env.port || 3000

app.locals.appTitle = "Our blog"

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static( path.join(__dirname, 'public')))



app.get('/', routes.homepage)

const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server in ascolto sulla porta: ${port}`)
})
