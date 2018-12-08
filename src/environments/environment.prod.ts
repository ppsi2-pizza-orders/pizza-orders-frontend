export const environment = {
  production: true,
  apiBaseUrl: 'https://api.pizzaorders.pl',
  whitelist: [
    'api.pizzaorders.pl',
  ],
  blacklist: [
    'api.pizzaorders.pl/auth/*',
  ],
};
