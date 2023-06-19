import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) res.status(400).send({ error: 'malformatted parameters' });
    else res.json({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
