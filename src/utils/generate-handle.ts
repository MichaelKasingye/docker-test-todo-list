/**
 * Generate a unique ID for an entity.
 * @param handleName The argument name.
 * @returns Returns a new handle name.
 */

export const generateHandle = (handleName: string): string => {
    return handleName?.toLowerCase().split(' ').join('-');
};
