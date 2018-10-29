// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
