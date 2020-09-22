// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    imerview: 'http://localhost:3000/api/v1',
  },
  mapbox: {
    token:
      'pk.eyJ1IjoidGltb3RoeTM0IiwiYSI6ImNrZWNycHFkdDBsazcyem1pOW8yeDFydmcifQ.3MeiDeCkzuunsCpB9tzfBw',
  },
  firebase: {
    apiKey: 'AIzaSyBPbdv0573vhlzx11NwuEK4XqfviPOMPWM',
    authDomain: 'immerview.firebaseapp.com',
    databaseURL: 'https://immerview.firebaseio.com',
    projectId: 'immerview',
    storageBucket: 'immerview.appspot.com',
    messagingSenderId: '329032125566',
    appId: '1:329032125566:web:5fba286c0278d70f941c2f',
    measurementId: 'G-K2QGP4DSRF',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
