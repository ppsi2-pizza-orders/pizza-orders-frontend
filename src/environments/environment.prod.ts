export const environment = {
  production: true,
  apiBaseUrl: 'http://api.pizzaorders.pl',
  whitelist: [
    'api.pizzaorders.pl',
  ],
  blacklist: [
    'api.pizzaorders.pl/auth/*',
  ],
};
