function findExpirationDate(factor) {
    let expirationDate = new Date()

    expirationDate.setFullYear(1997)
    expirationDate.setMonth(9)
    expirationDate.setDate(7)

    expirationDate.setDate(expirationDate.getDate() + Number(factor))
    expirationDate.setTime(expirationDate.getTime() + expirationDate.getTimezoneOffset() - 10800000)

    return expirationDate.toISOString().substring(0, 10)
}

module.exports = {
    findExpirationDate
}