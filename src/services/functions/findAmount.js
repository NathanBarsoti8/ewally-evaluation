function findAmount(factor) {
    const value = factor.substr(0, 8)
    const cents = factor.substr(8, 2)

    return `${Number(value)}.${cents}`
}

module.exports = {
    findAmount
}