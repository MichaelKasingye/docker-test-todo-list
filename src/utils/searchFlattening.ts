export const searchData = (arr: any, filterValue: any) => {
    return arr.filter((item: any) => {
        const flattenedData: any = flattenObject(item);
        for (let key in flattenedData) {
            if (
                flattenedData[key]
                    ?.toString()
                    .toLowerCase()
                    .indexOf(filterValue) > -1
            ) {
                return item;
            }
        }
    });
};
const flattenObject = (obj: any) => {
    const flattened: any = {};
    Object.keys(obj).forEach((key: any) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            Object.assign(flattened, flattenObject(value));
        } else {
            flattened[key] = value;
        }
    });
    return flattened;
};
