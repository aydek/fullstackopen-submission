import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { arrayContainsOnlyNumbers, isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) res.status(400).send({ error: 'malformatted parameters' });
    else res.json({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
});

interface ReqBody {
    daily_exercises: number[];
    target: number;
}

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as ReqBody;
    if (!daily_exercises || !target) res.status(400).send('malformed parameters');
    else if (!Array.isArray(daily_exercises) || Array.isArray(target)) res.status(400).send('malformed parameters');
    else if (isNotNumber(target) || !arrayContainsOnlyNumbers(daily_exercises) || daily_exercises.length < 1) res.status(400).send('malformed parameters');
    else res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
