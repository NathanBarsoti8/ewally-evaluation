const { findAmount } = require('./findAmount');
const { calculateModule10 } = require('./calculateModule10')

function processBankSlip(typedLine) {
    const bankSlip = {
        "isValid": true,
        "errMessage": null,
        "info": null
    }

    const barCode =
        typedLine.substr(0, 4) +
        typedLine.substr(32, 1) +
        typedLine.substr(33, 14) +
        typedLine.substr(4, 5) +
        typedLine.substr(10, 10) +
        typedLine.substr(21, 10);

    const fields = [
        typedLine.substr(0, 10),
        typedLine.substr(10, 11),
        typedLine.substr(21, 11),
        typedLine.substr(32, 1),
        typedLine.substr(33, 14)
    ]

    let expirationDate = null
    let amount = null

    for (const [index, field] of fields.entries()) {
        //validate dv from fields
        if (index <= 2) {
            const dv = calculateModule10(field)

            if (dv != field[field.length - 1]) {
                bankSlip.isValid = false
                bankSlip.errMessage = "Invalid typed line. The check digit of field doesn't match."

                return bankSlip
            }
        }

        //validate dv from bar code
        if (index === 3) {
            const dvBarCode = calculateModule11(barCode)

            if (dvBarCode != field) {
                bankSlip.isValid = false
                bankSlip.errMessage = "Invalid typed line. The check digit of bar code doesn't match."

                return bankSlip
            }
        }

        //find expiration date and amount
        if (index === 4) {
            const expirationDateFactor = field.substr(0, 4)
            const valeuFactor = field.substr(4, 10)

            expirationDate = findExpirationDate(expirationDateFactor)
            amount = findAmount(valeuFactor)
        }
    }

    bankSlip.info = {
        "barCode": barCode,
        "amount": amount,
        "expirationDate": expirationDate
    }

    return bankSlip
}

function calculateModule11(barCode) {
    const number = barCode.substr(0, 4) + barCode.substr(5, 39)
    const count = number.length - 1

    let sum = 0
    var peso = 2
    var base = 9

    for (let i = count; i >= 0; i--) {
        const value = number.substring(i, i + 1)
        sum = sum + (value * peso)

        if (peso < base) {
            peso++
        }
        else {
            peso = 2
        }
    }

    let dv = 11 - (sum % 11)

    if (dv == 0 || dv > 9) {
        dv = 1
    }

    return dv
}

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
    processBankSlip
}