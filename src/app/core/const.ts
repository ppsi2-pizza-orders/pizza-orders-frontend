export const ORDER_PICKUP_TYPES = {
    DELIVER: 'deliver',
    PICKUP: 'pickup',
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
};

export const ADMIN_API_URLS = {
  GetIngredients: '/admin/ingredients',
  AddIngredient: '/ingredient',
  DeleteIngredient: '/ingredient',
  DeleteRestaurant: '/restaurant',
  GetRestaurants: '/admin/restaurants',
  GetUsers: '/admin/users'
};
