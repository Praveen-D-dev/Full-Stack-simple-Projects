const express = require('express');
const { evaluate } = require('mathjs');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.post('/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        const result = evaluate(expression); 
        res.json({ result });
    } catch (error) {
        res.status(400).json({ result: 'Error' });
    }
});
app.listen(3000, () => console.log('Calculator: http://localhost:3000'));   