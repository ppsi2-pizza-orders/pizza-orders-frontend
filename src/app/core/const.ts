export const ORDER_PICKUP_TYPES = {
    DELIVER: 'deliver',
    PICKUP: 'pickup',
};
export const PAYMENTS = [
    { img: 'assets/blik.png' },
    { img: 'assets/visa-mastercard.png' },
    { img: 'assets/payu.jpg' },
    { img: 'assets/cash.png' }
];
export const PATH_PARAMS = {
    'params': {
        '_method': 'patch'
    }
};
export const API_URLS = {
  Login: '/auth/login',
  SocialLogin: '/auth/facebook',
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
  GetRestaurants: '/admin/restaurants',
  GetUsers: '/admin/users'
};
