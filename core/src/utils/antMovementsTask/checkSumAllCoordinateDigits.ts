import { getNumberDigitsSum } from './getNumberDigitsSum';

interface IArgs {
    x: number;
    y: number;
    maxSum: number;
}

export const checkSumAllCoordinateDigits = (args: IArgs): boolean => {
    const { x, y, maxSum } = args;

    return getNumberDigitsSum(x) + getNumberDigitsSum(y) <= maxSum;
};
