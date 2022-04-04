function calculateModule10(field) {
    const sizeField = field.length - 1
    let code = field.substr(0, sizeField)
    let sum = 0
    let dv = 0

    code = strrev(code)

    for (const [index, value] of code.entries()) {
        const mutiplier = value * (index % 2 == 0 ? 2 : 1)

        //when multiplier is > 9 need to sum digits before
        if (mutiplier > 9) {
            sum += mutiplier.toString().split('').reduce((sum, current) => {
                return parseInt(sum) + parseInt(current)
            })
        }
        else {
            sum += mutiplier
        }

        if (code.length == index + 1) {
            //calculate next ten immediately upper to the sum
            const nextTen = Math.ceil(sum / 10) * 10
            dv = nextTen - sum
        }
    }

    return dv
}

function strrev(string) {
    return string.split('').reverse()
}

module.exports = {
    calculateModule10
}