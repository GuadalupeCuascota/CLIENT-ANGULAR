// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  ////SERVIDOR LOCAL

  // API_URI:'http://localhost:5000/api',
  // API_URI1:'http://localhost:5000/login'

////SERVIDOR REMOTO
  API_URI:'https://server-app-stem.herokuapp.com/api',
  API_URI1:'https://server-app-stem.herokuapp.com/login'

};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
