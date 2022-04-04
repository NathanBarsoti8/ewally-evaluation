function findAmount(number) {
    const numberLengthLessTwo = number.length - 2

    const value = number.substr(0, numberLengthLessTwo)
    const cents = number.substr(numberLengthLessTwo, 2)

    return `${Number(value)}.${cents}`
}

module.exports = {
    findAmount
}