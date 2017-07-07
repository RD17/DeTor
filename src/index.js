import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import api from './api'
import config from './config'

let app = express()
app.server = http.createServer(app)

app.use(cors({
	credentials: "*",
	origin: false
}))

app.use(bodyParser.json({
	limit: config.bodyLimit
}))

// api router
app.use('/', api({ config }))
app.server.listen(process.env.PORT || config.port)

console.log(`Started on ${app.server.address().address}:${app.server.address().port}`)

export default app