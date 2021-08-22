const index = require("./index")
// @ponicode
describe("index.getPrice", () => {
    test("0", () => {
        let callFunction = () => {
            index.getPrice(0.0, 571.00)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.getPrice(-1, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.getPrice(1, 392.00)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.getPrice("Hat", 392.00)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.getPrice("Shoes", 977.00)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.getPrice(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.getOrderPrice", () => {
    test("0", () => {
        let callFunction = () => {
            index.getOrderPrice(0, 4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.getOrderPrice(977.00, 10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.getOrderPrice(258.00, 11)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            index.getOrderPrice(2, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            index.getOrderPrice(1, 10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.getOrderPrice(-Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
