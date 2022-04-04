const { calculateModule10 } = require('../services/functions/calculateModule10')

describe("Calculate module 10", () => {
    it("Calculate module 10 for bank typedLine", async () => {
        const field = "2129000119"
        const dv = calculateModule10(field)

        expect(dv).toEqual(9)
    })
    
    it("Calculate module 10 for insurance typedLine", async () => {
        const field = "559900801007"
        const dv = calculateModule10(field)

        expect(dv).toEqual(7)
    })
})