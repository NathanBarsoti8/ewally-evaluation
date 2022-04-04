const { TYPES } = require('../utils/consts')
const { processBankSlip } = require('./functions/processBankSlip')
const { processInsurance } = require('./functions/processInsurance')

module.exports = async (req, res) => {
    try {
        const { isValid, type, typedLine, errMessage } = validateTypedLine(req.params.typedLine)

        if (!isValid) {
            return res.status(400).json({ message: errMessage })
        }

        if (type === TYPES.Bank) {
            const { isValid: isValidBankSlip, errMessage, info } = processBankSlip(typedLine)

            if (!isValidBankSlip) {
                return res.status(400).json({ message: errMessage })
            }

            return res.status(200).json(info)
        }
        else {
            const { isValid: isValidInsurance, errMessage, info } = processInsurance(typedLine)

            if (!isValidInsurance) {
                return res.status(400).json({ message: errMessage })
            }

            return res.status(200).json(info)
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
            stack: err.stack
        })
    }
}

function validateTypedLine(typedLine) {
    const cleanTypedLine = removeSpecialCharacters(typedLine)
    const validate = {
        "isValid": true,
        "errMessage": null,
        "typedLine": cleanTypedLine,
        "type": cleanTypedLine.length === 47 ? TYPES.Bank : cleanTypedLine.length === 48 ? TYPES.Insurance : null
    }

    if (!cleanTypedLine) {
        validate.isValid = false
        validate.errMessage = "Need to send typedLine in route params to complete request."
    }
    else if (!validate.type) {
        validate.isValid = false
        validate.errMessage = `Invalid line. The typed line must contain 47 characters for banks and for insurances must contain 48 characters. The typed line entered contains ${cleanTypedLine.length} characters.`
    }
    else {
        const hasLetters = containLetters(cleanTypedLine)

        if (hasLetters) {
            validate.isValid = false
            validate.errMessage = "The typed line must contain only number, the typed line has letters."
        }
    }

    return validate
}

function removeSpecialCharacters(typedLine) {
    return typedLine.replace(/[^\w\s]/gi, "")
}

function containLetters(typedLine) {
    const letters = []

    for (const char of typedLine) {
        const letter = isNaN(Number(char))
        letters.push(letter)
    }

    return letters.some(letter => letter)
}