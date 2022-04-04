const { findAmount } = require('../services/functions/findAmount')

describe("Find amount", () => {
    it("Convert factor of bank typedLine to cost", async () => {
        const cost = findAmount("0000002000")
        expect(cost).toEqual("20.00")
    })
    
    it("Convert factor of insurance typedLine to cost", async () => {
        const cost = findAmount("00000005599")
        expect(cost).toEqual("55.99")
    })
})