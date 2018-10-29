export const environment = {
  production: true,
  apiBaseUrl: 'http://api.pizzaorders.pl',
  client_secret: 'WDYR6SmfFsu2dFW1U2Zfo9R3n9FTfhBtsy1G9fWF',
  whitelist: [
    'http://api.pizzaorders.pl/admin/*',
    'http://api.pizzaorders.pl/managment/*',
  ],
  blacklist: [
    'http://api.pizzaorders.pl/auth/*',
  ],
};
