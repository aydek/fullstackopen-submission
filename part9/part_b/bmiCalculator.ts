const conditions = [
    { maxBmi: 16, label: 'Underweight (Severe thinness)' },
    { maxBmi: 17, label: 'Underweight (Moderate thinness)' },
    { maxBmi: 18.5, label: 'Underweight (Mild thinness)' },
    { maxBmi: 25, label: 'Normal range' },
    { maxBmi: 30, label: 'Overweight (Pre-obese)' },
    { maxBmi: 35, label: 'Obese (Class I)' },
    { maxBmi: 40, label: 'Obese (Class II)' },
    { maxBmi: Number.POSITIVE_INFINITY, label: 'Obese (Class III)' },
];

interface ArgValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): ArgValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string | undefined => {
    const bmi = weight / Math.pow(height / 100, 2);
    for (const condition of conditions) {
        if (bmi < condition.maxBmi) {
            return condition.label;
        }
    }
    return undefined;
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
