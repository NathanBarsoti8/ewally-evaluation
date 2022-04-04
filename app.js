const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes/index')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))

routes(app)

app.listen(port, () => {
    console.log(`API LISTENING ON PORT ${port}`)
})

//swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = { app }