import { STATUS_ACCEPTED, STATUS_NEW, STATUS_REALIZATION, STATUS_DELIVERY, STATUS_FINISHED } from './const';

export enum RestaurantRoles {
    Owner = 1,
    Manager = 2,
    Cook = 3
}

export const orderStatusName = (status: string) => {
    switch (status) {
        case STATUS_NEW: return 'oczekujące';
        case STATUS_ACCEPTED: return 'przyjęte';
        case STATUS_REALIZATION: return 'w realizacji';
        case STATUS_DELIVERY: return 'dostarczono';
        case STATUS_FINISHED: return 'gotowe';
    }
};
