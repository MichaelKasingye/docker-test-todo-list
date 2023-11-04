import { createQueryObject } from './create-query-object';
/**
 * Dynamically paginate and filter data for an entity.
 * @param repositoryField The repository field argument.
 * @param filterParam The filter query(s) value to filter by argument name.
 * @param queryValue The query value to filter.
 * @param paginationSkipValue The pagination skip value.
 * @param paginationLimitValue The pagination limit value.
 * @param sortingObject The sort order object argument name e.g {name:"ASC",id:"DESC"}.
 * @param filterType The filterType which is either OR or AND, default type is an OR.
 * @returns Returns new paginated and filtered data.
 */

// BASIC QUERY
export const dynamicQuery = (
    repositoryField: any,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);
    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    return repositoryField.find({
        order: sortingObject,
        where: queryObject,
        skip: paginationSkipValue,
        take: paginationLimitValue,
    });
};

// USER QUERY
export const dynamicQueryUsers = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.hotel', 'hotel')
        .where('hotel.id = :hotelId', { hotelId: hotelId })
        .orderBy(sortingObject)
        .skip(paginationSkipValue)
        .take(paginationLimitValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (key === 'role') {
                queryBuilder.andWhere(`user.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else if (key === 'isEmailVerified') {
                queryBuilder.andWhere(`user.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else {
                queryBuilder.andWhere(`user.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }

    return queryBuilder.getMany();
};

// RESERVATION QUERY
export const dynamicQueryReservation = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.guest', 'guest')
        .leftJoinAndSelect('reservation.hotel', 'hotel')
        .where('hotel.id = :hotelId', { hotelId: hotelId })
        .orderBy(sortingObject)
        .skip(paginationSkipValue)
        .take(paginationLimitValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (key === 'firstName' || key === 'lastName') {
                queryBuilder.andWhere(`guest.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            } else if (
                [
                    'isActive',
                    'status',
                    'totalAmount',
                    'roomTypePrice',
                    'totalAmount',
                    'numberofRooms',
                ].includes(key)
            ) {
                queryBuilder.andWhere(`reservation.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else {
                queryBuilder.andWhere(`reservation.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }
    return queryBuilder.getMany();
};

// RESERVATION CART QUERY
export const dynamicQueryReservationCart = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('reservationCart')
        .leftJoinAndSelect('reservationCart.guestId', 'guestId')
        .leftJoinAndSelect('reservationCart.reservations', 'reservations')
        .leftJoinAndSelect(
            'reservationCart.paymentSessionsId',
            'paymentSessionsId'
        )
        .leftJoinAndSelect('reservationCart.paymentId', 'paymentId')
        .leftJoinAndSelect('reservationCart.hotel', 'hotel')
        .where('hotel.id = :hotelId', { hotelId: hotelId })
        .orderBy(sortingObject)
        .skip(paginationSkipValue)
        .take(paginationLimitValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (
                [
                    'discounts',
                    'giftCards',
                    'taxes',
                    'totalDiscount',
                    'refundTotal',
                    'actualCartTotal',
                    'type',
                ].includes(key)
            ) {
                queryBuilder.andWhere(`reservationCart.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else if (
                [
                    'firstName',
                    'lastName',
                    'phoneNumber',
                    'nationality',
                ].includes(key)
            ) {
                queryBuilder.andWhere(`guestId.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            } else {
                queryBuilder.andWhere(`reservationCart.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }
    return queryBuilder.getMany();
};

// HOTEL QUERY
export const dynamicQueryHotel = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('hotel')
        .leftJoinAndSelect(
            'hotel.reservationCollections',
            'reservationCollections'
        )
        .leftJoinAndSelect('hotel.users', 'users')
        .leftJoinAndSelect('hotel.reservation', 'reservation')
        .leftJoinAndSelect('hotel.address', 'address')
        .leftJoinAndSelect('hotel.room', 'room')
        .orderBy(sortingObject)
        .skip(paginationSkipValue)
        .take(paginationLimitValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (
                [
                    'isActive',
                    'metadata',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                    'contactPhoneNumber',
                    'contactAlternativePhoneNumber',
                    'country',
                    'contactFirstName',
                    'contactLastName',
                    'city',
                    'street',
                    'location',
                    'postCode',
                    'zipCode',
                ].includes(key) //numberOfRooms
            ) {
                queryBuilder.andWhere(`address.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            } else if (key === 'numberOfRooms') {
                queryBuilder.andWhere(`hotel.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else {
                queryBuilder.andWhere(`hotel.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }
    return queryBuilder.getMany();
};

// GUEST QUERY
export const dynamicQueryGuest = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('guest')
        .leftJoinAndSelect('guest.reservationId', 'reservation')
        .leftJoinAndSelect('guest.billingAddress', 'GuestAddress')
        .leftJoinAndSelect('guest.hotel', 'hotel')
        .where('hotel.id = :hotelId', { hotelId: hotelId })
        .orderBy(sortingObject)
        .skip(paginationSkipValue)
        .take(paginationLimitValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (
                [
                    'metadata',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                    'contactPhoneNumber',
                    'contactAlternativePhoneNumber',
                    'country',
                    'contactFirstName',
                    'contactLastName',
                    'city',
                    'street',
                    'location',
                    'postCode',
                    'zipCode',
                ].includes(key)
            ) {
                queryBuilder.andWhere(`GuestAddress.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            } else if (key === 'hasAccount' || key === 'isActive') {
                queryBuilder.andWhere(`guest.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else {
                queryBuilder.andWhere(`guest.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }
    return queryBuilder.getMany();
};

// ROOM QUERY
export const dynamicQueryRoom = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.roomNumbers', 'RoomNumbers')
        .leftJoinAndSelect('room.addOns', 'Storage')
        .leftJoinAndSelect('room.hotel', 'hotel')
        .where('hotel.id = :hotelId', { hotelId: hotelId })
        .orderBy(sortingObject)
        .skip(paginationSkipValue)
        .take(paginationLimitValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (
                [
                    'roomNumbers',
                    'numberOfRooms',
                    'basePricePerNight',
                    'roomSize',
                ].includes(key)
            ) {
                queryBuilder.andWhere(`room.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else {
                queryBuilder.andWhere(`room.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }
    return queryBuilder.getMany();
};

// STORAGE QUERY
export const dynamicQueryStorage = (
    repositoryField: any,
    hotelId: string,
    filterParam: any,
    queryValue: any,
    paginationSkipValue?: number,
    paginationLimitValue?: number,
    filterType?: string
) => {
    let queryObject = createQueryObject(filterParam, queryValue, filterType);

    let sortingObject: any = {};
    for (const [key, value] of Object.entries(queryObject[0])) {
        Object.values(queryObject[0]).filter((entryValue) => {
            if (
                (entryValue === 'ASC' || entryValue === 'DESC') &&
                entryValue === value
            ) {
                sortingObject[key] = value;
                delete queryObject[0][key];
            }
        });
    }

    const queryBuilder = repositoryField
        .createQueryBuilder('storage')
        .leftJoinAndSelect('storage.hotel', 'hotel')
        .leftJoinAndSelect('storage.user', 'user')
        .where('hotel.id = :hotelId', { hotelId: hotelId })
        .orderBy(sortingObject)
        .take(paginationLimitValue)
        .skip(paginationSkipValue);

    if (queryObject) {
        for (const [key, value] of Object.entries(queryObject[0])) {
            if (key === 'status' || key === 'itemQuantity') {
                queryBuilder.andWhere(`storage.${key} = :${key}`, {
                    [key]: `${value}`,
                });
            } else {
                queryBuilder.andWhere(`storage.${key} ILIKE :${key}`, {
                    [key]: `${value}%`,
                });
            }
        }
    }

    return queryBuilder.getMany();
};
