const { findExpirationDate } = require('./findExpirationDate')
const { findAmount } = require('./findAmount')
const { calculateModule10 } = require('./calculateModule10')

function processInsurance(typedLine) {
    const insurance = {
        "isValid": true,
        "errMessage": null,
        "info": null
    }

    const fields = [
        typedLine.substr(0, 12),
        typedLine.substr(12, 12),
        typedLine.substr(24, 12),
        typedLine.substr(36, 12)
    ]

    let expirationDate = null
    let amount = null

    const module = verifyModule(typedLine)

    for (const [index, field] of fields.entries()) {
        if (module == 10) {
            const dv = calculateModule10(field)

            if (dv != field[field.length - 1]) {
                insurance.isValid = false
                insurance.errMessage = `Invalid typed line. The check digit of field ${index + 1} doesn't match.`

                return insurance
            }
        }
        else {
            const dv = calculateModule11(field)
        }


    }

    return insurance
}

function verifyModule(typedLine) {
    let module = null
    const value = Number(typedLine.substr(2, 1))

    if ([6, 7].includes(value)) {
        module = 10
    }
    else if ([8, 9].includes(value)) {
        module = 11
    }

    return module
}

function calculateModule11(barCode) {
   //to do
}

module.exports = {
    processInsurance
}