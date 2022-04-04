const { processBankSlip } = require('../services/functions/processBankSlip')

describe("Process bank slip", () => {
    it("Valid typed line", async () => {
        const typedLine = "21290001192110001210904475617405975870000002000"
        const result = processBankSlip(typedLine)
        const expectedResult = {
            "isValid": true,
            "errMessage": null,
            "info": {
                "barCode": "21299758700000020000001121100012100447561740",
                "amount": "20.00",
                "expirationDate": "2018-07-16"
            }
        }

        expect(result).toEqual(expectedResult)
    })

    it("Typed line with bar code's dv incorrect", async () => {
        const typedLineWithWrongBarCodeDv = "21290001192110001210904475617405475870000002000"
        const result = processBankSlip(typedLineWithWrongBarCodeDv)
        const expectedResult = {
            "isValid": false,
            "errMessage": "Invalid typed line. The check digit of bar code doesn't match.",
            "info": null
        }

        expect(result).toEqual(expectedResult)
    })

    it("Typed line bank with blocks' dv incorrect", async () => {
        const typedLineWithWrongBlockDv = "21290001172110001210904475617405975870000002000"

        const result = processBankSlip(typedLineWithWrongBlockDv)
        const expectedResult = {
            "isValid": false,
            "errMessage": "Invalid typed line. The check digit of field doesn't match.",
            "info": null
        }

        expect(result).toEqual(expectedResult)
    })
})