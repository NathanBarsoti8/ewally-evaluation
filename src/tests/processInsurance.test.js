const { processInsurance } = require('../services/functions/processInsurance')

describe("Process insurance", () => {
    it("Valid typed line", async () => {
        const typedLine = "846200000004559900801007011234590377922036314164"
        const result = processInsurance(typedLine)
        const expectedResult = {
            "isValid": true,
            "errMessage": null,
            "info": {
                "barCode": "846200000004559900801007011234590377922036314164",
                "amount": "55.99",
                "expirationDate": "not found"
            }
        }

        expect(result).toEqual(expectedResult)
    })

    it("Typed line with bar code's dv incorrect", async () => {
        const typedLineWithWrongBlockDv = "846200000008559900801007011234590377922036314164"
        const result = processInsurance(typedLineWithWrongBlockDv)
        const expectedResult = {
            "isValid": false,
            "errMessage": "Invalid typed line. The check digit doesn't match.",
            "info": null
        }

        expect(result).toEqual(expectedResult)
    })
})