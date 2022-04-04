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

    const barCode = fields.join('')
    let barCodeWithoutDv = ''

    for (const field of fields) {
        barCodeWithoutDv = barCodeWithoutDv + field.substr(0, 11)
    }

    const { module, value } = verifyModule(typedLine)

    for (const field of fields) {
        if (module == 10) {
            const dv = calculateModule10(field)

            if (dv != field[field.length - 1]) {
                insurance.isValid = false
                insurance.errMessage = "Invalid typed line. The check digit doesn't match."

                return insurance
            }
        }
        else {
            const dv = calculateModule11(field)

            if (dv != field[field.length - 1]) {
                insurance.isValid = false
                insurance.errMessage = "Invalid typed line. The check digit doesn't match."

                return insurance
            }
        }
    }

    let expirationDate = null
    let amount = null

    if (barCodeWithoutDv) {
        expirationDate = findExpirationDate(barCodeWithoutDv)
        amount = calculateAmount({ barCode: barCodeWithoutDv, valueRef: value })
    }

    insurance.info = {
        "barCode": barCode,
        "amount": amount || "não found",
        "expirationDate": expirationDate || "not found"
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

    return { module, value }
}

function calculateModule11(field) {
    const sizeField = field.length - 1
    let code = field.substr(0, sizeField)
    let sum = 0

    code = strrev(code)

    for (const [index, value] of code.entries()) {
        const add = index >= 8 ? index - 8 : index
        sum += value * (2 + add)

        if (code.length == index + 1) {
            const rest = sum % 11
            let dv = null

            if (rest == 0 || rest == 1) {
                dv = 0
            }
            else if (rest == 10) {
                dv = 1
            }
            else {
                const nextTen = Math.ceil(sum / 11) * 11
                dv = nextTen - sum
            }

            return dv
        }
    }
}

function strrev(string) {
    return string.split('').reverse()
}

function calculateAmount({ barCode, valueRef }) {
    let amount = null

    if (valueRef === 6 || valueRef === 8) {
        const valueBarCode = barCode.substr(4, 11)
        amount = findAmount(valueBarCode)
    }

    return amount
}

function findExpirationDate(barCode) {
    const freeField = barCode.substr(23, 21)
    const date = `${freeField.substr(0, 4)}-${freeField.substr(4, 2)}-${freeField.substr(6, 2)}`
    const isValid = date instanceof Date && !isNaN(date)

    return isValid ? date : null
}

module.exports = {
    processInsurance
}