const express = require('express');
const { evaluate } = require('mathjs'); // Safer than eval()
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        // evaluate() takes a string like "10+5*2" and returns 20
        const result = evaluate(expression); 
        res.json({ result });
    } catch (error) {
        res.status(400).json({ result: 'Error' });
    }
});

app.listen(3000, () => console.log('Calculator: http://localhost:3000'));   