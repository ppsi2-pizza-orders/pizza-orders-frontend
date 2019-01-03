import { STATUS_ACCEPTED, STATUS_NEW, STATUS_REALIZATION, STATUS_DELIVERY, STATUS_FINISHED } from './const';

export enum RestaurantRoles {
    Owner = 1,
    Manager = 2,
    Cook = 3
}

export const orderStatusName = (status: string): string => {
    switch (status) {
        case STATUS_NEW: return 'oczekujące';
        case STATUS_ACCEPTED: return 'przyjęte';
        case STATUS_REALIZATION: return 'w realizacji';
        case STATUS_DELIVERY: return 'dostarczane';
        case STATUS_FINISHED: return 'gotowe';
    }
};

export const statusClass = (status: string): string => {
    switch (status) {
        case STATUS_NEW: return 'badge-secondary';
        case STATUS_ACCEPTED: return 'badge-primary';
        case STATUS_REALIZATION: return 'badge-warning';
        case STATUS_DELIVERY: return 'badge-info';
        case STATUS_FINISHED: return 'badge-success';
    }
};
