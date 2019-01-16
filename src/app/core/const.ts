export const STATUS_NEW = 'new';
export const STATUS_ACCEPTED = 'accepted';
export const STATUS_REALIZATION = 'realization';
export const STATUS_DELIVERY = 'delivery';
export const STATUS_FINISHED = 'finished';

export const ORDER_PICKUP_TYPES = {
    DELIVER: 'deliver',
    PICKUP: 'pickup',
};

export const PIZZA_TYPES = {
    CUSTOM: 'custom',
    MENU: 'menu',
    MENU_CUSTOMIZED: 'menu_customized'
};

export const PAYMENTS = [
    { name: 'blik', img: 'assets/blik.png' },
    { name: 'card', img: 'assets/visa-mastercard.png' },
    { name: 'payu', img: 'assets/payu.jpg' },
    { name: 'cash', img: 'assets/cash.png' }
];

export const PATH_PARAMS = {
    'params': {
        '_method': 'patch'
    }
};

export const API_URLS = {
  Login: '/auth/login',
  SocialLogin: '/auth/facebook',
  RefreshToken: '/auth/refresh',
  RegisterUser: '/auth/register',
  RegisterRestaurant: '/auth/restaurant',
  GetRestaurants: '/restaurants',
  GetRestaurant: '/restaurant',
  AddRestaurant: '/restaurant',
  GetAutocomplete: '/restaurants',
  SendOrder: '/order',
  GetOrder: '/order',
  AddPizza: '/restaurant',
  EditPizza: '/restaurant'
};

export const ADMIN_API_URLS = {
  GetIngredients: '/admin/ingredients',
  AddIngredient: '/ingredient',
  DeleteIngredient: '/ingredient',
  DeleteRestaurant: '/restaurant',
  GetRestaurants: '/admin/restaurants',
  StatusRestaurant: '/admin/restaurant',
  GetUsers: '/admin/users'
};
