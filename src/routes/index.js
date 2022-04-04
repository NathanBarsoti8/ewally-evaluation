module.exports = (app) => {
    const basev1 = '/api/v1'

    app.use(`${basev1}/bills`, require('./bills'))
}