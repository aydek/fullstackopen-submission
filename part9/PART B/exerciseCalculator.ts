import { isNotNumber } from './utils';

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ArgValues {
    target: number;
    days: number[];
}

const calculateExercises = (target: number, hours: number[]): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter((val) => val > 0).length;
    const average = hours.reduce((a, b) => a + b, 0) / periodLength;
    const success = target <= average;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'target acheived! :)';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'needs improvement, target not acheived... :(';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArguments = (args: string[]): ArgValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const allDays = [];
    for (let i = 3; i < args.length; i++) {
        if (isNotNumber(args[i])) throw new Error('Argumens must be a numbers');
        allDays.push(Number(args[i]));
    }
    return { target: Number(args[2]), days: allDays };
};

try {
    const { target, days } = parseArguments(process.argv);
    console.log(calculateExercises(target, days));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
