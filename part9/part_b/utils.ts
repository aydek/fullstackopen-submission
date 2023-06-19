// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayContainsOnlyNumbers = (arr: any[]): boolean => {
    return arr.every((element) => typeof element === 'number');
};
