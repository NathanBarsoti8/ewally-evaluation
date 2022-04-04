const { processInsurance } = require('../services/functions/processInsurance')

describe("Process insurance", () => {
    it("Valid typed line with module 10", async () => {
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

    it("Typed line with bar code's dv incorrect with module 10", async () => {
        const typedLineWithWrongBlockDv = "846200000008559900801007011234590377922036314164"
        const result = processInsurance(typedLineWithWrongBlockDv)
        const expectedResult = {
            "isValid": false,
            "errMessage": "Invalid typed line. The check digit doesn't match.",
            "info": null
        }

        expect(result).toEqual(expectedResult)
    })

    it("Valid typed line with module 11", async () => {
        const typedLine = "858900004609524601791605607593050865831483000010"
        const result = processInsurance(typedLine)
        const expectedResult = {
            "isValid": true,
            "errMessage": null,
            "info": {
                "barCode": "858900004609524601791605607593050865831483000010",
                "amount": "46052.46",
                "expirationDate": "not found"
            }
        }

        expect(result).toEqual(expectedResult)
    })

    it("Typed line with bar code's dv incorrect with module 11", async () => {
        const typedLineWithWrongBlockDv = "858900004607524601791605607593050865831483000010"
        const result = processInsurance(typedLineWithWrongBlockDv)
        const expectedResult = {
            "isValid": false,
            "errMessage": "Invalid typed line. The check digit doesn't match.",
            "info": null
        }

        expect(result).toEqual(expectedResult)
    })
})