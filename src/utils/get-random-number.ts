export const getRandomNumber = (max: number, str: string) => {
    const random = Math.floor(Math.random() * max).toString();
    return str.concat(random);
};
