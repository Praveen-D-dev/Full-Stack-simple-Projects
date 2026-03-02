const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { result: null });
});

router.post("/calculate", (req, res) => {
    const { num1, num2, operator } = req.body;

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    let result;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
            if (b === 0) result = "Cannot divide by zero!";
            else result = a / b;
            break;
        default:
            result = "Invalid operator";
    }

    res.render("index", { result });
});

module.exports = router;