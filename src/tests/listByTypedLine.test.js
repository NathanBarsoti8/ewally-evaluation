const supertest = require('supertest')
const { app } = require('../../app')
const request = supertest(app)
const DEFAULT_ROUTE = '/api/v1/bills'

describe("List by tiped line service", () => {
    it("Nullable typed line", async () => {
        await request.get(`${DEFAULT_ROUTE}/`)
            .expect(404)
    })

    it("Typed line with letters", async () => {
        const typedLineWithLetters = "21290001192110001210904475617405975870000002wwp"

        await request.get(`${DEFAULT_ROUTE}/${typedLineWithLetters}`)
            .expect(400, {
                message: "The typed line must contain only number, the typed line has letters."
            })
    })

    it("Invalid length of typed line", async () => {
        const typedLineWithWrongLength = '21290001192110001210904475617405975870000002'

        await request.get(`${DEFAULT_ROUTE}/${typedLineWithWrongLength}`)
            .expect(400, {
                message: "Invalid line. The typed line must contain 47 characters for banks and for insurances must contain 48 characters. The typed line entered contains 44 characters."
            })
    })

    it("Valid typed line bank", async () => {
        const typedLine = "21290001192110001210904475617405975870000002000"

        await request.get(`${DEFAULT_ROUTE}/${typedLine}`)
            .expect(200, {
                "barCode": "21299758700000020000001121100012100447561740",
                "amount": "20.00",
                "expirationDate": "2018-07-16"
            })
    })

    it("Typed line bank with bar code's dv incorrect", async () => {
        const typedLineWithWrongBarCodeDv = "21290001192110001210904475617405475870000002000"

        await request.get(`${DEFAULT_ROUTE}/${typedLineWithWrongBarCodeDv}`)
            .expect(400, {
                message: "Invalid typed line. The check digit of bar code doesn't match."
            })
    })

    it("Typed line bank with blocks' dv incorrect", async () => {
        const typedLineWithWrongBlockDv = "21290001172110001210904475617405975870000002000"

        await request.get(`${DEFAULT_ROUTE}/${typedLineWithWrongBlockDv}`)
            .expect(400, {
                message: "Invalid typed line. The check digit of field doesn't match."
            })
    })

    it("Valid typed line insurance", async () => {
        const typedLine = "846200000004559900801007011234590377922036314164"

        await request.get(`${DEFAULT_ROUTE}/${typedLine}`)
            .expect(200, {
                "barCode": "846200000004559900801007011234590377922036314164",
                "amount": "55.99",
                "expirationDate": "not found"
            })
    })

    it("Typed line insurance with blocks' dv incorrect", async () => {
        const typedLineWithWrongBlockDv = "846200000008559900801007011234590377922036314164"

        await request.get(`${DEFAULT_ROUTE}/${typedLineWithWrongBlockDv}`)
            .expect(400, {
                message: "Invalid typed line. The check digit doesn't match."
            })
    })
})