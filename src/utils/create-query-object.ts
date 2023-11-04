import { Like } from 'typeorm';
/**
 * Create query object.
 * @param filterParam The filter query(s) value to filter by argument name.
 * @param queryValue The query value argument name.
 * @param filterType The filterType which is either OR or AND, default type is an OR.
 * @returns Returns new query object.
 */

export const createQueryObject = (
    filterParam: any,
    queryValue: any,
    filterType?: string
) => {
    var dataObject = {};
    var dataArray = [];

    if (filterType === 'OR' || filterType === undefined || filterType === '') {
        if (
            typeof filterParam === 'string' ||
            (typeof filterParam === 'number' && filterParam !== null)
        ) {
            dataObject[filterParam] = Like(`%${queryValue}%`);
            dataArray.push(dataObject);
        } else if (Array.isArray(filterParam) && filterParam !== null) {
            for (let key of filterParam) {
                let obj = {};
                obj[key] = Like(`%${queryValue}%`);
                dataArray.push(obj);
            }
        } else if (typeof filterParam === 'object' && filterParam !== null) {
            dataArray.push(filterParam);
        } else {
            return undefined;
        }
    } else if (filterType === 'AND') {
        if (
            typeof filterParam === 'string' ||
            (typeof filterParam === 'number' && filterParam !== null)
        ) {
            dataObject[filterParam] = Like(`%${queryValue}%`);
            dataArray.push(dataObject);
        } else if (Array.isArray(filterParam) && filterParam !== null) {
            for (let key of filterParam) {
                dataObject[key] = Like(`%${queryValue}%`);
            }
            dataArray.push(dataObject);
        } else if (typeof filterParam === 'object' && filterParam !== null) {
            dataArray.push(filterParam);
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }

    return dataArray;
};
