/**
 * Generate a omit white space for an entity.
 * @param OmitWhiteSpace The argument name.
 * @returns Returns a new word without spaces.
 */

export const generateOmitWhiteSpace = (handleName: string): string => {
    return handleName?.toLowerCase().split(' ').join('');
};

// Capitalize the first letter of each word in the hotel name and remove extra spaces
export const omitWhiteSpaceAndCapitalizeWords = (name: string): string => {
    return name
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
