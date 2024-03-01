export const getNumberDigitsSum = (number: number): number => {
    const getSum = (num: number): number => {
        const remainder = num % 10;
        if (remainder === num) {
            return remainder;
        }

        return remainder + getSum(Math.trunc(num / 10));
    };

    return getSum(Math.trunc(number));
};
