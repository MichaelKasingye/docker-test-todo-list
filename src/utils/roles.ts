import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

export const roles: any = () => {
    ac.grant('user').readOwn('user').updateOwn('user');

    ac.grant('admin')
        .extend('user')
        .createAny('user')
        .readAny('user')
        .updateAny('user')
        .deleteAny('user')
        .readAny('hotel')
        .createAny('reservation')
        .readAny('reservation')
        .updateAny('reservation')
        .deleteAny('reservation')
        .createAny('payment')
        .readAny('payment')
        .updateAny('payment')
        .deleteAny('payment')
        .createAny('reservation-cart')
        .readAny('reservation-cart')
        .updateAny('reservation-cart')
        .deleteAny('reservation-cart')
        .createAny('reservation-collection')
        .updateAny('reservation-collection')
        .readAny('reservation-collection')
        .deleteAny('reservation-collection')
        .createAny('reservation-tags')
        .updateAny('reservation-tags')
        .readAny('reservation-tags')
        .deleteAny('reservation-tags')
        .createAny('reservation-type')
        .updateAny('reservation-type')
        .readAny('reservation-type')
        .deleteAny('reservation-type')
        .createAny('inventory')
        .updateAny('inventory')
        .readAny('inventory')
        .deleteAny('inventory')
        .createAny('inventory-category')
        .updateAny('inventory-category')
        .readAny('inventory-category')
        .deleteAny('inventory-category')
        .createAny('inventory-subcategory')
        .updateAny('inventory-subcategory')
        .readAny('inventory-subcategory')
        .deleteAny('inventory-subcategory')
        .createAny('guest')
        .updateAny('guest')
        .readAny('guest')
        .deleteAny('guest')
        .createAny('storage')
        .updateAny('storage')
        .readAny('storage')
        .deleteAny('storage')
        .createAny('addresses')
        .updateAny('addresses')
        .readAny('addresses')
        .deleteAny('addresses')
        .createAny('categories')
        .updateAny('categories')
        .readAny('categories')
        .deleteAny('categories')
        .createAny('room')
        .updateAny('room')
        .readAny('room')
        .deleteAny('room')
        .createAny('room-numbers')
        .updateAny('room-numbers')
        .readAny('room-numbers')
        .deleteAny('room-numbers');

    ac.grant('owner')
        .extend('user')
        .extend('admin')
        .createAny('hotel')
        .updateAny('hotel')
        .readAny('hotel');

    ac.grant('developer')
        .extend('admin')
        .extend('user')
        .extend('owner')
        .deleteAny('hotel');

    ac.grant('manager').extend('admin').deleteAny('hotel');
    ac.grant('front_desk').extend('admin').deleteAny('hotel');
    ac.grant('storage_manager').extend('admin').deleteAny('hotel');
    ac.grant('house_keeping_manager').extend('admin').deleteAny('hotel');
    ac.grant('head_chef').extend('admin').deleteAny('hotel');
    ac.grant('bar_manager').extend('admin').deleteAny('hotel');
    ac.grant('laundry_manager').extend('admin').deleteAny('hotel');
    return ac;
};
