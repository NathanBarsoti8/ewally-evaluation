module.exports = (app) => {
    const basev1 = '/api/v1'

    app.use(`${basev1}/bills`, require('./bills'))
    app.use('/', (req, res) => { return res.send("API to consult bank slip and payment of insurances") })
}